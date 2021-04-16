
const importAll = (r) => r.keys().map(r);
export const fileManager=()=>{
	const blogFiles=importAll(require.context("./Blogs/BlogData/Blogs", false, /\.js$/));
	const blogImages=importAll(require.context("./Blogs/BlogData/BlogImages/Images", false, /\.png$/));
	const blogHeaderImages=importAll(require.context("./Blogs/BlogData/BlogImages/HeaderImages", false, /\.png$/));

	const files={ 
		blogFiles,
		blogImages,
		blogHeaderImages
	}
	return files;
}


