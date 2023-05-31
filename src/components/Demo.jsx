import React, { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import { ArrowRightCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handlesSubmit= async(e) => {

    e.preventDefault();
    
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      setArticle(newArticle);
      
      console.log(newArticle);
    }
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      {/*Search*/}
      <div className="flex flex-col w-full ap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={(handlesSubmit)}>
            <img src={linkIcon} alt="link_icon" className="absolute left-0 my-2 ml-3 w-5"/>
            <input 
              type = "url" 
              placeholder = "Enter a url" 
              value = {article.url} 
              onChange={(e) => setArticle({article, url: e.target.value})} required 
            className="url_input peer"/>

            <button
              type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
              <PaperAirplaneIcon className="h-4 w-4 -rotate-45"/>
            </button>
          </form>
          {/*Browse URL History*/}

      </div>
      {/*Display Results*/}

    </section>
  )
}

export default Demo