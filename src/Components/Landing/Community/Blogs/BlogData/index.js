import {fileManager} from "../../utilFileManager.js";
import BlogMetaDescription from "../blogDataMetaDescription.js";


export const BlogsData=()=>{
		debugger;
		let {
				blogFiles,
				blogImages,
				blogHeaderImages
			}=fileManager();
		const finalBlogs=[];
		blogFiles=blogFiles.reverse()
		blogHeaderImages=blogHeaderImages.reverse()

		for(var i=0;i<blogFiles.length;i++){
			const headerImage=blogHeaderImages[i];
			const {
				title,
				description
			}=BlogMetaDescription.blogs[i];
			const blog={
				title,
				description,
				headerImage
			}
			finalBlogs.push(blog);
		}
		return finalBlogs;
}


/*
	export const BlogsData=()=>{
		debugger;
		const {blogFiles,blogImages}=fileManager();
		const finalBlogs=[];

		for(var i=0;i<blogFiles.length;i++){
			const blogFile=blogFiles[i];
			const componentBlog=blogFile.default();
			const {
				title,
				description
			}=BlogMetaDescription.blogs[i];
			const blog={
				title,
				description,
				component:componentBlog
			}
			finalBlogs.push(blog);
		}
		return finalBlogs;
	}

*/