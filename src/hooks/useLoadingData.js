import { useState, useEffect, useMemo, useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
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
        pageSuccessStories: data.pageSuccessStories.map(
          (item) => item.successStory,
        ),
      },
      {
        pageProducts: data.pageProducts.map((item) => item.product),
      },
      {
        pageServices: data.pageServices.map((item) => item.service),
      },
    ].reduce((acc, item) => {
      const key = Object.keys(item)[0];
      acc[key] = item[key];
      return acc;
    }, {});
  }, []);

  useEffect(() => {
    if (!pageName) return;

    let isMounted = true;
    setIsMediaLoading(true);

    const loadContent = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/Pages/${pageName}/content`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          const processedContent = processContent(data);
          setContent(processedContent);
        }
      } catch (error) {
        if (isMounted) {
          setContent(null);
          console.error('Error loading content:', error);
        }
      } finally {
        if (isMounted) {
          setIsMediaLoading(false);
        }
      }
    };

    loadContent();

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
