import "./HeroPage.css";
import { useState } from "react";
import axios from "axios";

const HeroPage = () => {
  const [textPrompt, setTextPrompt] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");

  // API Key
  const API_KEY = import.meta.env.VITE_RAPID_API_KEY;

  const getTextPrompt = async () => {
    const options = {
      method: "POST",
      url: "https://ai-text-to-image-generator-flux-free-api.p.rapidapi.com/aaaaaaaaaaaaaaaaaiimagegenerator/quick.php",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host":
          "ai-text-to-image-generator-flux-free-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        prompt: textPrompt,
        style_id: 49,
        size: "16-9",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setImagePrompt(response.data.final_result[0].origin);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="hero">
      {imagePrompt && (
        <img className="img-prompt" src={imagePrompt} alt="Generated visual" />
      )}
      <h1 className="title">Prompt: {textPrompt}</h1>
      <input
        type="text"
        placeholder="Describe the image you want..."
        value={textPrompt}
        onChange={(e) => setTextPrompt(e.target.value)}
      />
      <button onClick={getTextPrompt}>Generate Image</button>
    </section>
  );
};

export default HeroPage;
