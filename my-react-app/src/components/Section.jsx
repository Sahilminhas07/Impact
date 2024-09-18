import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/api';

const Section = () => {
  const [horizontalVideos, setHorizontalVideos] = useState([]); // State for horizontal videos
  const [verticalVideos, setVerticalVideos] = useState([]); // State for vertical videos
  const [verticalImages, setVerticalImages]=useState([])
  
  const title = 'Evergreen'; // Category you're looking for

  useEffect(() => {
    const getAds = async () => {
      try {
        const data = await fetchData();

        // Find the category 'Evergreen'
        const adsCategory = data.data.Ads.find(ad => 
          ad.content.some(cat => cat.cat_name === title)
        );

        if (adsCategory) {
          // Extract the content for the 'Evergreen' category
          const evergreenCategory = adsCategory.content.find(cat => cat.cat_name === title);

          //Filter Images



          // Filter videos by type
          const horizontal = evergreenCategory.content.filter(video => video.type === 'hrz');
          const vertical = evergreenCategory.content.filter(video => video.type === 'vrt');

          // Set the filtered videos into state
          setHorizontalVideos(horizontal);
          setVerticalVideos(vertical);
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };
    getAds();
  }, [title]);

  return (
    <section className="bg-black px-5 py-5">
      <h1 className="text-3xl text-white font-bold py-4">ADS</h1>
      <h1 className="text-2xl text-white py-3">EVERGREEN</h1>

      {/* Container for horizontal videos */}
      <div className="flex flex-wrap gap-4">
        {horizontalVideos.length > 0 ? (
          horizontalVideos.map((video, index) => (
            <div 
              key={index} 
              className="h-[200px] w-[400px] bg-white rounded-lg overflow-hidden relative group"
            >
              {/* Image that shows initially */}
              <img
                src={video.p_image}
                alt={video.p_name}
                className="h-full w-full object-cover absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
              />
              {/* Video that plays on hover */}
              <video
                src={video.url}
                muted
                className="h-full w-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                loop
              />
              
            </div>
          ))
        ) : (
          <p className="text-white">No horizontal videos available</p>
        )}
      </div>

      {/* Container for vertical videos */}
      <div className="flex flex-wrap gap-4 mt-8">
        {verticalVideos.length > 0 ? (
          verticalVideos.map((video, index) => (
            <div 
              key={index} 
              className="h-[400px] w-[250px] bg-white rounded-lg overflow-hidden relative group"
            >
              {/* Image that shows initially */}
              <img
                src={video.p_image}
                alt={video.p_name}
                className="h-full w-full object-cover absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
              />
              {/* Video that plays on hover */}
              <video
                src={video.url}
                muted
                className="h-full w-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                loop
              />
              
            </div>
          ))
        ) : (
          <p className="text-white">No vertical videos available</p>
        )}
      </div>
    </section>
  );
};

export default Section;
