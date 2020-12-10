
const importAll = (r) => r.keys().map(r);
export const fileManager=()=>{
	//const blogFiles=importAll(require.context("./Blogs", false, /\.md$/));
	const videoFiles=importAll(require.context("./Interviews/Videos", false, /\.mp4$/));
	const blogFiles=importAll(require.context("./Blogs/BlogData/Blogs", false, /\.js$/));
	const blogImages=importAll(require.context("./Blogs/BlogData/BlogImages/Images", false, /\.png$/));
	const blogHeaderImages=importAll(require.context("./Blogs/BlogData/BlogImages/HeaderImages", false, /\.png$/));

	const files={
		videoFiles,
		blogFiles,
		blogImages,
		blogHeaderImages
	}
	return files;
}


/*
export const folders = Object.freeze({
  blogFiles: importAll(require.context("../blog", false, /\.md$/)),
  heroImages: importAll(require.context("../data/images/hero", false, /\.jpg$/)),
  tinyHeroImages: importAll(require.context("../data/images/hero/tiny", false, /\.jpg$/)),
});
*/


