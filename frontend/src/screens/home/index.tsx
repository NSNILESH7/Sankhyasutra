import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/navbar";
import Hero from "@/components/ui/HeroSection";

interface GeneratedResult {
  expression: string;
  answer: string;
}

interface Response {
  expr: string;
  result: string;
  assign: boolean;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [reset, setReset] = useState(false);
  const [dictOfVars, setDictOfVars] = useState({});
  const [result, setResult] = useState<GeneratedResult>();
  const [latexPosition, setLatexPosition] = useState({ x: 10, y: 200 });
  const [latexExpression, setLatexExpression] = useState<Array<string>>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    if (latexExpression.length > 0 && window.MathJax) {
      setTimeout(() => {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
      }, 0);
    }
  }, [latexExpression]);

  useEffect(() => {
    if (result) {
      renderLatexToCanvas(result.expression, result.answer);
    }
  }, [result]);

  useEffect(() => {
    if (reset) {
      resetCanvas();
      setLatexExpression([]);
      setResult(undefined);
      setDictOfVars({});
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - canvas.offsetTop;
        ctx.lineCap = "round";
        ctx.lineWidth = 3;
      }
    }
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
        },
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const renderLatexToCanvas = (expression: string, answer: string) => {
    const latex = `\\(\\LARGE{${expression} = ${answer}}\\)`;
   
    
    setLatexExpression([...latexExpression, latex]);

    // Clear the main canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.background = "black";
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
      }
    }
  };
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = color;
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
      }
    }
  };
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const runRoute = async () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const response = await axios({
        method: "post",
        url: "http://localhost:8900/calculate",
        data: {
          image: canvas.toDataURL("image/png"),
          dict_of_vars: dictOfVars,
        },
      });

      const resp = await response.data;
      console.log("Response", resp);
      resp.data.forEach((data: Response) => {
        if (data.assign === true) {
          // dict_of_vars[resp.result] = resp.answer;
          setDictOfVars({
            ...dictOfVars,
            [data.expr]: data.result,
          });
        }
      });
      const ctx = canvas.getContext("2d");
      const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
      let minX = canvas.width,
        minY = canvas.height,
        maxX = 0,
        maxY = 0;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          if (imageData.data[i + 3] > 0) {
            // If pixel is not transparent
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }

      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;

      setLatexPosition({ x: centerX, y: centerY });
      resp.data.forEach((data: Response) => {
        setTimeout(() => {
          setResult({
            expression: data.expr,
            answer: data.result,
          });
        }, 1000);
      });
    }
  };

  const colorPickerStyles = {
    wrapper: "relative inline-block",
    picker: "absolute top-10 z-50 shadow-lg rounded-lg p-2 bg-white",
    button:
      "h-8 w-8 rounded border border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors",
    backdrop: "fixed inset-0",
  };

  const ColorPickerButton = () => {
    return (
      <div className={colorPickerStyles.wrapper}>
        <Button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className={colorPickerStyles.button}
          style={{ backgroundColor: color }}
          title="Choose color"
        />

        {showColorPicker && (
          <div className={colorPickerStyles.picker}>
            <div
              className={colorPickerStyles.backdrop}
              onClick={() => setShowColorPicker(false)}
            />
            <HexColorPicker color={color} onChange={setColor} />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="max-w-full ">
        <div className="w-full h-full ">
          <Header />
          <Hero />
        </div>

        <div className="border-4 border-indigo-200 rounded-xl shadow-lg overflow-hidden bg-black ">
          <canvas
            ref={canvasRef}
            id="canvas"
            width={1200}
            height={1200}
            className="cursor-crosshair "
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
          />
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <Button
            onClick={runRoute}
            variant="default"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 shadow-md"
            >
          Find Solution
          </Button>
          <Button
              onClick={() => setReset(true)}
              variant="default"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200 shadow-md"
              >
              Clear Canvas
          </Button>
        </div>
      </div>
          <div className="mt-8 p-6 bg-white border-2 border-indigo-100 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 ">
              Solution
            </h3>
      {latexExpression &&
        latexExpression.map((latex, index) => (
            <Draggable
              key={index}
              defaultPosition={latexPosition}
              onStop={(e, data) => setLatexPosition({ x: data.x, y: data.y })}
            >
              <div className="absolute p-2 text-black rounded shadow-md border-2 border-black flex flex-wrap">
                <p className="latex-content text-2xl font-medium p-2 bg-blue">{latex}</p>
              </div>
            </Draggable>
        ))}
        </div>
    </>
  );
}
