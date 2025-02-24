export const templateImages = [
    require('../assets/a-festive-arrangement-of-vibrant-balloons-in-various-shapes-and-sizes-against-a-textured-confetti-backdrop-ai-generated-photo.jpg'),
    require('../assets/birthday-balloon-ppt-powerpoint-templates-background-19-11619257123rkworx27kl.jpg'),
    require('../assets/gettyimages-475419529-640x640.jpg'),
    require('../assets/happy-birthday-4k-images-with-beautiful-text-free-yellow-wallpaper-trbvrzf.jpg'),
    require('../assets/happy-birthday-banner-background-with-white-and-gold-balloon-gold-glitter-free-vector.jpg'),
    require('../assets/images (1).jpg'),
    require('../assets/images.jpg'),
    require('../assets/pexels-george-dolgikh-551816-1303081.jpg'),
    require('../assets/photo-1464347601390-25e2842a37f7.jpg'),
    require('../assets/pngtree-happy-birthday-typography-vector-design-for-greeting-cards-and-poster-with-image_16159004.jpg'),
  ];
  
  export const changeTemplate = (index, setBackgroundImage) => {
    if (index >= 0 && index < templateImages.length) {
      setBackgroundImage(templateImages[index]);
    } else {
      console.warn('Invalid template index provided.');
    }
  };
  
  export const getTemplates = () => templateImages;
  