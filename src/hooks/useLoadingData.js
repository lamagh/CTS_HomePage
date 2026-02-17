import { useState, useEffect, useMemo, useCallback } from "react";

function useLoadingData(pageName) {
  const [content, setContent] = useState(null);
  const [isMediaLoading, setIsMediaLoading] = useState(true);

  const processContent = useCallback((data) => {
    return [
      ...data.pageTexts.map((item) => ({
        [item.htmlElementId]: { ...item },
      })),
      ...data.pageMetrics.map((item) => ({
        [item.htmlElementId]: { ...item },
      })),
      {
        pageSuccessStories: [
          ...data.pageSuccessStories.map((item) => item.successStory),
        ],
      },
      {
        pageProducts: [...data.pageProducts.map((item) => item.product)],
      },
      {
        pageServices: [...data.pageServices.map((item) => item.service)],
      },
    ].reduce((acc, item) => {
      const key = Object.keys(item)[0];
      acc[key] = item[key];
      return acc;
    }, {});
  }, []);

  useEffect(() => {
    if (!pageName) {
      return;
    }

    let isMounted = true;

    fetch(`/api/Pages/${pageName}/content`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        return resp.json();
      })
      .then((data) => {
        if (isMounted) {
          const processedContent = processContent(data);
          setContent(processedContent);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setIsMediaLoading(true);
          console.error("Error loading content:", error);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsMediaLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [pageName, processContent]);

  const memoizedContent = useMemo(() => {
    if (!content) return null;
    return content;
  }, [content]);

  return [memoizedContent, isMediaLoading, setIsMediaLoading];
}

export default useLoadingData;
