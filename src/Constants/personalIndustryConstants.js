export default{
	INDUSTRIES:[
		{	
			industry:"General",
			subCommunity:[
				{industry:"Sympocia Announcements"},
				{industry:"Today I learned"},
				{industry:"Ask Sympocia"},
				{industry:"Boring Concepts Explained Fun"},
				{industry:"Unreal"},
				{industry:"Plot Twist"}
			],
			backgroundColor:"linear-gradient(to left, #9933ff 0%, #ff99ff 100%)",
			solidBackgroundColor:"#9933ff",
			id:1,
			popularQuestions:[
				{
					question:"How are you feeling today honestly? Whats on your mind?",
					type:"RegularPost"
				},{
					question:"Goals for this week",
					type:"Video"
				},{
					question:"Upload the most recent photo you have in your camera roll so everyone can see",
					type:"Image"
				}
			]
		},
		{ industry:"Photography",
			backgroundColor:"linear-gradient(to right, #ff9933 0%, #ffff00 100%)",
			solidBackgroundColor:"#ff9933",
			subCommunity:[
				{industry:"Landscape"},
				{industry:"Wildlife"},
				{industry:"Aerial"},
				{industry:"Sports"},
				{industry:"Portrait"},
				{industry:"Fashion"}
			],
			specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Critique my photography"
						},
						{
							question:"Photography supplies"
						}
					],
					regularPostQuestion:[
						{
							question:"Photography resources"
						}
					]	
			},
			popularQuestions:[
				{
					question:"Best shot you’ve taken ",
					type:"Image"
				},{
					question:"Goals for this week photography wise",
					type:"Image"
				},{
					question:"What’s something new that you learned about photography? ",
					type:"RegularPost"
				}
			],
		id:1 },
		{ industry:"Gaming",
			backgroundColor:"linear-gradient(to right, #00ccff 0%, #00ffff 100%)",
			solidBackgroundColor:"#00ccff",
			subCommunity:[
				{industry:"Super Smash Bros"},
				{industry:"Call of duty"},
				{industry:"Fornite"},
				{industry:"Overwatch"},
				{industry:"League of Legends"},
				{industry:"Elder Scrolls"},
				{industry:"Marvel Games"},
				{industry:"Counter Strike"},
				{industry:"World of Warcraft"},
				{industry:"Elder Scrolls"},
				{industry:"Minecraft"},
				{industry:"Sports"},
				{industry:"Actions"},
				{industry:"Battle Royale"},
				{industry:"Action Adventure"},
				{industry:"Role-playing"},
				{industry:"Adventure"},
				{industry:"Racing"},
				{industry:"Fighting"},
				{industry:"Simulator"}
			],
			popularQuestions:[
				{
					question:"Give your game review :)",
					type:"RegularPost"
				},{
					question:"Best combination from a game",
					type:"Video"
				},{
					question:"Rant about a video game",
					type:"RegularPost"
				},
				{
					question:"Offer tips/Ask for help",
					type:"RegularPost"	
				}
			],id:2 },
		{ industry:"TV Shows",
			backgroundColor:"linear-gradient(to right, #f12711 0%, #f5af19 100%)",
			solidBackgroundColor:"#f12711",
			subCommunity:[
				{industry:"Drama"},
				{industry:"Comedy"},
				{industry:"Reality"},
				{industry:"News"},
				{industry:"Sports"},
				{industry:"Documentary"},
				{industry:"Game of Thrones"},
				{industry:"Breaking Bad"},
				{industry:"Rick and Morty"},
				{industry:"The Sopranos"},
				{industry:"Friends"},
				{industry:"The Office"},
				{industry:"Black Mirror"},
				{industry:"Curb Your Enthusiam"},
				{industry:"Walking dead"},
				{industry:"American Horror Story"},
				{industry:"Riverdale"},
				{industry:"Orange is the new black"}
			],
			specificIndustryQuestions:{
					videoQuestion:[
						{
							question:"Critique my tv show"
						}
					],
					regularPostQuestion:[
						{
							question:"Critique my script"
						},
						{
							question:"TV Show Jobs"
						}
					]	
			},
			popularQuestions:[
				{
					question:"What are you binging right now?",
					type:"RegularPost"
				},{
					question:"Give your own 20 word review of a show",
					type:"RegularPost"
				},{
					question:"Give your own tv conspiracy theory about a show",
					type:"RegularPost"
				},
				{
					question:"Tell us about some plot holes you've noticed... Or just rant :)",
					type:"RegularPost"	
				}
			],id:3},
		{ industry:"Movies",
			backgroundColor:"linear-gradient(to right, #c6ffdf, #c9facc, #d0f4b9, #dbeda7, #e8e496, #f0d989, #f8cd7f, #ffc079, #ffae75, #ff9c74, #fd8a77, #f7797d)",
			solidBackgroundColor:"#c6ffdf",
			subCommunity:[
				{industry:"Action"},
				{industry:"Adventure"},
				{industry:"Comedy"},
				{industry:"Crime"},
				{industry:"Drama"},
				{industry:"Fantasy"},
				{industry:"Horror"},
				{industry:"Science Fiction"}
			],
			specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Critique my script"
						}
					],
					regularPostQuestion:[
						{
							question:"Critique my movie"
						},
						{
							question:"Movie jobs"
						}
					]
			},
			popularQuestions:[
				{
					question:"Give your own idea for a movie",
					type:"RegularPost"
				},{
					question:"Review your own movie",
					type:"RegularPost"
				},{
					question:"Promote your own short film/movie",
					type:"RegularPost"
				}
			],id:1 
		},
		{ industry:"Music",
				backgroundColor:"linear-gradient(to right,#2193b0 0%, #6dd5ed 100%)",
				solidBackgroundColor:"#2193b0",
				subCommunity:[
				{industry:"Jazz"},
				{industry:"Rap"},
				{industry:"Hip Hop"},
				{industry:"Blues"},
				{industry:"Rock"},
				{industry:"Folk Music"},
				{industry:"Reggae"},
				{industry:"Pop Music"},
				{industry:"Heavy Metal"},
				{industry:"Orchestra"},
				{industry:"Instrumental"},
				{industry:"Pop Music"}
			],
			specificIndustryQuestions:{
					audioQuestion:[
						{
							question:"Free beats"
						},
						{
							question:"Review my work"
						}
					],
					regularPostQuestion:[
						{
							question:"Photography resources"
						}
					]	
			},
			popularQuestions:[
				{
					question:"Provide a link your beats so that we could hear what you've worked on",
					type:"RegularPost"
				},{
					question:"Let people know you're open to collaborate",
					type:"RegularPost"
				},{
					question:"Milestones for your music (let everyone know what you working on)",
					type:"RegularPost"
				}
			],id:2 },
		{ industry:"News",
			backgroundColor:"linear-gradient(to right,#ee9ca7 0%, #ffdde1 100%)",
			solidBackgroundColor:"#ee9ca7",
			subCommunity:[
				{industry:"Sports"},
				{industry:"Technology"},
				{industry:"Weather"},
				{industry:"Current Events"},
				{industry:"Breaking News"},
				{industry:"Government"},
				{industry:"Environmental"},
				{industry:"World Wide"}
			],
			specificIndustryQuestions:{
					regularPostQuestion:[
						{
							question:"News Advisory"
						}
					]	
			},
			popularQuestions:[
				{
					question:"Conspiracy theories",
					type:"RegularPost"
				},{
					question:"Give your opinion on certain situations",
					type:"RegularPost"
				},{
					question:"Expose actual fake news and why you think they’re fake",
					type:"RegularPost"
				}
			],id:3},
			/*
				{	industry:"Memes",
					subCommunity:[
						{industry:"Dark Humor"},
						{industry:"Political Satire"},
						{industry:"Witty Humor"},
						{industry:"Troll Humor"}
					],
					backgroundColor:"linear-gradient(to right,#000046 0%,#1CB5E0 100%)",
					popularQuestions:[
						{
							question:"Upload the memes you have created :)",
							type:"Image"
						},{
							question:"Most offensive/funny memes you can find",
							type:"Image"
						}
					]
				},
		*/
		{ 	industry:"Finance",
			subCommunity:[
				{industry:"Corporate Finance"},
				{industry:"Valuation"},
				{industry:"Portfolio Management"}
			],
			backgroundColor:"linear-gradient(to right,#654ea3 0%, #eaafc8 100%)",
			solidBackgroundColor:"#654ea3",
			id:2,
			specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Finance Achievments"
						},
						{
							question:"Recommended Books"
						}
					],
					regularPostQuestion:[
						{
							question:"Finance tutoring services"
						}
					]	
			},
			popularQuestions:[
				{
					question:"Long term goals",
					type:"RegularPost"
				},{
					question:"Tips and tricks for getting started with investing and finance",
					type:"RegularPost"
				},{
					question:"How much did you make today milestones",
					type:"RegularPost"	
				}
			]
		},
		{ 	industry:"Law",
			subCommunity:[
				{industry:"Admiralty (Maritime) Law"},
				{industry:"Bankruptcy"},
				{industry:"Civil Rights"},
				{industry:"Criminal"},
				{industry:"Entertainment"},
				{industry:"Environmental"},
				{industry:"Family"},
				{industry:"Health"},
				{industry:"Immigration"},
				{industry:"Intellectual Property"},
				{industry:"International"},
				{industry:"Labor (Employment)"},
				{industry:"Military"},
				{industry:"Personal Injury"},
				{industry:"Real Estate"},
				{industry:"Tax"}
			],
			backgroundColor:"linear-gradient(to right, #8a2387, #a21e81, #b71d7a, #ca2170, #d92c66, #e2355d, #e93f54, #ef4b4b, #f25442, #f35d38, #f3672d, #f27121",
			solidBackgroundColor:"#8a2387",
			id:1,
			specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Law Achievments"
						},
						{
							question:"Recommended Books"
						}
					],
					regularPostQuestion:[
						{
							question:"Law tutoring services"
						}
					]	
			},
			popularQuestions:[
				{
					question:"Most interesting case you’ve come against today",
					type:"RegularPost"
				},{
					question:"Your take on the current climate of cases",
					type:"RegularPost"
				},{
					question:"An advice for people who are just starting out?",
					type:"RegularPost"	
				},{
					question:"What more can be done for the people (ideas)",
					type:"RegularPost"	
				}
			]
		},
		{ 	industry:"Medicine",
			subCommunity:[
				{industry:"Family Medicine"},
				{industry:"Pediatrics"},
				{industry:"Emergency Medicine"},
				{industry:"Anesthesiology"},
				{industry:"Obstetrics"},
				{industry:"Gynecology"},
				{industry:"General Surgery"},
				{industry:"Psychiatry"},
				{industry:"Radiology"},
				{industry:"Dermatology"}
			],
			backgroundColor:"linear-gradient(to right,#a8ff78 0%, #78ffd6 100%)",
			solidBackgroundColor:"#a8ff78",
			id:2,
			specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Medicine Achievments"
						},
						{
							question:"Recommended Books"
						}
					],
					regularPostQuestion:[
						{
							question:"Medical tutoring services"
						}
					]	
			},
			popularQuestions:[
				{
					question:"MCAT preparation quick tips and advices",
					type:"RegularPost"
				},{
					question:"What did you learn today in the medical field",
					type:"RegularPost"
				},{
					question:"What was your most interesting patient you saw and how did it impact you",
					type:"RegularPost"	
				},{
					question:"What are some unique stuff that you do while you study that makes things easier/more productive/funner",
					type:"RegularPost"	
				}
			]
		},
		{ industry:"Art",
			backgroundColor:"linear-gradient(to right,#FDC830 0%, #F37335 100%)",
			solidBackgroundColor:"#FDC830",
			subCommunity:[
				{industry:"Graffiti"},
				{industry:"Animation"},
				{industry:"Street Art"},
				{industry:"Illustration"},
				{industry:"Life Drawings"},
				{industry:"Paintings"},
				{industry:"Digital Art"},
				{industry:"Contemporary Art"}
			],id:3,
			specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Critique my art"
						},
						{
							question:"Art supplies"
						}
					],
					regularPostQuestion:[
						{
							question:"Art resources"
						}
					]	
			},
			popularQuestions:[
				{
					question:"What was something you created this week",
					type:"Image"	
				},
				{
					question:"Quick tips on drawing better",
					type:"RegularPost"
				},{
					question:"What you hope to accomplish this week in your art?",
					type:"RegularPost"
				},{
					question:"Show us an artwork that has the most meaning for you",
					type:"Image"	
				}
			]
		},
		{ industry:"Graphic Design",
			backgroundColor:"linear-gradient(to right,#00B4DB 0%, #0083B0 100%)",
			solidBackgroundColor:"#00B4DB",
			subCommunity:[
				{industry:"User Interface Graphics"},
				{industry:"Art And Illustrations"},
				{industry:"Environmental Graphics"},
				{industry:"Illustration And posters"}
			],id:1,
			specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Critique my graphic design"
						},
						{
							question:"Graphic design supplies"
						}
					],
					regularPostQuestion:[
						{
							question:"Graphic Design resources"
						}
					]	
			},
			popularQuestions:[
				{
					question:"What was something you created this week",
					type:"Image"	
				},
				{
					question:"Quick tips on making better graphic designs",
					type:"RegularPost"
				},{
					question:"What you hope to accomplish this week in your art?",
					type:"RegularPost"
				},{
					question:"Show us an artwork that has the most meaning for you",
					type:"Image"	
				}
			] 
		},
		{ industry:"Design",
			backgroundColor:"linear-gradient(to right,#ad5389 0%,#ad5389 100%)",
			solidBackgroundColor:"#ad5389",
			subCommunity:[
				{industry:"Architecture And Interior"},
				{industry:"Garden And Landscape"},
				{industry:"Product Design"},
				{industry:"Furniture Design"}
			],id:2,
			specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Critique my design"
						},
						{
							question:"Design supplies"
						}
					],
					regularPostQuestion:[
						{
							question:"Design resources"
						}
					]	
			},
			popularQuestions:[
				{
					question:"Where do you see architecture going in the futute?",
					type:"RegularPost"	
				},
				{
					question:"Show us your best architecture designs ",
					type:"Image"
				},{
					question:"Milestones",
					type:"RegularPost"
				},{
					question:"What do you hope to accomplish this week?",
					type:"RegularPost"	
				}
			] 
		},
		/*
		{ industry:"Anthropology",
				backgroundColor:"linear-gradient(to right,#bc4e9c 0%,#f80759 100%)",
				subCommunity:[
				{industry:"Biological"},
				{industry:"Cultural"},
				{industry:"Linguistic"},
				{industry:"Archaeology"}
			],id:3,
			popularQuestions:[
				{
					question:"How to get started in anthropology tips and suggestions",
					type:"RegularPost"	
				},
				{
					question:"Tell us about something interesting you learned this week so far in your field",
					type:"RegularPost"
				}
			]
		},*/
		{ industry:"Computer Science",
				backgroundColor:"linear-gradient(to right,#11998e 0%,#38ef7d 100%)",
				solidBackgroundColor:"#38ef7d",
				subCommunity:[
					{industry:"Artificial Intelligence"},
					{industry:"Computer Architecture and Engineering"},
					{industry:"Computer Graphics and Visualization"},
					{industry:"Computer Networks"},
					{industry:"Databases"},
					{industry:"Information Science"},
					{industry:"Software Engineering"},
					{industry:"Concurrent, Parallel and Distributed Systems"},
					{industry:"Theory of Computation"},
					{industry:"Algorithms and Data Structures"},
					{industry:"Cloud Computing"},
					{industry:"Machine Learning"}
				],id:1,
				specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Computer Science Achievments"
						},
						{
							question:"Recommended Books"
						}
					],
					regularPostQuestion:[
						{
							question:"Computer Science tutoring services"
						}
					]	
				},
			popularQuestions:[
				{
					question:"Milestones",
					type:"RegularPost"	
				},
				{
					question:"What do you want to accomplish and what do you need help in?",
					type:"RegularPost"
				},{
					question:"Give your opinion on a framework or language",
					type:"RegularPost"
				},{
					question:"Tips in getting started and becoming a better developer",
					type:"RegularPost"	
				},{
					question:"What are some new things that you have learned this week",
					type:"RegularPost"	
				},{
					question:"Tips on setting up a production level ready frontend and backend and cloud (Share one point)",
					type:"RegularPost"	
				},{
					question:"Engineering Milestones",
					type:"RegularPost"	
				},{
					question:"Rant about your desired language",
					type:"RegularPost"	
				}
			]
		},
		{ industry:"Cooking",
			subCommunity:[
				{industry:"Baking"},
				{industry:"Frying"},
				{industry:"Roasting"},
				{industry:"Grilling"},
				{industry:"Steaming"},
				{industry:"Poaching"},
				{industry:"Simmering"},
				{industry:"Broiling"},
				{industry:"Blanching"},
				{industry:"Braising"},
				{industry:"Stewing"}
			],
			backgroundColor:"linear-gradient(to right,#11998e 0%,#38ef7d 100%)",
			solidBackgroundColor:"#11998e",
			id:2,
			specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Selling cooking items"
						}
					],
					regularPostQuestion:[
						{
							question:"Cooking tips"
						},
						{
							question:"Cooking jobs"
						}
					]	
			},
			popularQuestions:[
				{
					question:"Favorite recipe (with your spin on it)",
					type:"Image"	
				},
				{
					question:"What did you cook this week?",
					type:"Image"
				},{
					question:"Favorite restaurant and meal of all time",
					type:"RegularPost"
				},{
					question:"Give a critique about something you've made recently that you found online",
					type:"RegularPost"	
				}
			]
		},
		{ industry:"Anime",
			backgroundColor:"linear-gradient(to right, #40e0d0, #53dba5, #79d274, #a1c542, #cab206, #df9e00, #f18811, #ff6f2c, #ff5940, #ff4154, #ff266a, #ff0080)",
			solidBackgroundColor:"#40e0d0",
			subCommunity:[
				{industry:"Dragon Ball"},
				{industry:"One piece"},
				{industry:"Pokemon"},
				{industry:"Naruto"},
				{industry:"Death Note"},
				{industry:"Detective Conan"},
				{industry:"Attack On Titan"},
				{industry:"Sailor Moon"},
				{industry:"Fullmetal Alchemist"},
				{industry:"Sword Art Online"},
				{industry:"My Hero Academia"},
				{industry:"Black Clover"},
				{industry:"Hunter x Hunter"},
				{industry:"Bleach"},
				{industry:"Cowboy Bebop"}
			],id:3,
			specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Critique my anime/manga"
						},
						{
							question:"Anime/Manga supplies"
						}
					],
					regularPostQuestion:[
						{
							question:"Anime/Mange resources"
						}
					]	
			},
			popularQuestions:[
				{
					question:"Give your own idea for an anime show",
					type:"RegularPost"	
				},
				{
					question:"Conspiracy theories",
					type:"RegularPost"
				},{
					question:"Review your favorite anime in your own light",
					type:"RegularPost"
				},{
					question:"Recommend an anime",
					type:"RegularPost"	
				},{
					question:"Best anime moments that hit you",
					type:"RegularPost"	
				}
			]
		},
		{ industry:"Poetry",
			backgroundColor:"linear-gradient(to right, #0f0c29, #131433, #19193e, #1f1e49, #262454, #282656, #2a2858, #2c2a5a, #2a2953, #28274c, #262645, #24243e)",
			solidBackgroundColor:"#131433",
			subCommunity:[
				{industry:"Haiku"},
				{industry:"Free Verse"},
				{industry:"Cinquains"},
				{industry:"Epic"},
				{industry:"Ballad"},
				{industry:"Acrostic"},
				{industry:"Sonnets"}
			],
			specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Critique my poetry"
						},
						{
							question:"Poetry supplies"
						}
					],
					regularPostQuestion:[
						{
							question:"Poetry resources"
						}
					]	
			},
			id:1,
			popularQuestions:[
				{
					question:"What does poetry mean to you?",
					type:"RegularPost"	
				},
				{
					question:"Show us the most beautiful poetry that you seen",
					type:"RegularPost"
				},{
					question:"Write  your best poetry",
					type:"RegularPost"
				}
			]
		},
		{ 
			industry:"Books",
			backgroundColor:"linear-gradient(to right,#fc4a1a 0%,#f7b733 100%)",
			solidBackgroundColor:"#fc4a1a",
			id:2,
			subCommunity:[
				{industry:"Science Fiction"},
				{industry:"Satire"},
				{industry:"Drama"},
				{industry:"Action and Adventure"},
				{industry:"Romance"},
				{industry:"Mystery"},
				{industry:"Horror"}
			],
			specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Critique my book"
						},
						{
							question:"Book supplies"
						}
					],
					regularPostQuestion:[
						{
							question:"Creating book resources"
						}
					]	
			},
			popularQuestions:[
				{
					question:"Favorite book of all time",
					type:"RegularPost"	
				},
				{
					question:"Advice from experienced sellers to people who are just starting out",
					type:"RegularPost"
				},{
					question:"Shoutout a book you really liked that you read recently",
					type:"RegularPost"
				}
			]
		},
		{ industry:"Comics",
			backgroundColor:"linear-gradient(to right,#ff9966 0%,#ff5e62 100%)",
			solidBackgroundColor:"#ff9966",
			subCommunity:[
					{industry:"Marvel"},
					{industry:"DC"},
					{industry:"Science Fiction/Fantasy"},
					{industry:"Action"},
					{industry:"Horror"}
				],id:3,
				specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Critique my comic book"
						},
						{
							question:"Comic book supplies"
						}
					],
					regularPostQuestion:[
						{
							question:"Comic book resources"
						}
					]	
			},
			popularQuestions:[
				{
					question:"Who is the best comic book hero and why",
					type:"RegularPost"	
				},
				{
					question:"Your favorite comic book cover of all time",
					type:"Image"
				},{
					question:"Favorite comic book",
					type:"RegularPost"
				},{
					question:"Create your own comic book hero idea",
					type:"RegularPost"
				}
			]
		},
		{ industry:"Science",
			backgroundColor:"linear-gradient(to right,#7F00FF 0%,#E100FF 100%)",
			solidBackgroundColor:"#7F00FF",
			subCommunity:[
					{industry:"Astronomy"},
					{industry:"Biology"},
					{industry:"Chemistry"},
					{industry:"Earth And Sciences"},
					{industry:"Physics"},
					{industry:"Social Sciences"},
					{industry:"Behavorial Sciences"},
					{industry:"Health Sciences"}
				],id:1,
				specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Science Achievments"
						},
						{
							question:"Recommended Books"
						}
					],
					regularPostQuestion:[
						{
							question:"Science tutoring services"
						}
					]	
				},
			popularQuestions:[
				{
					question:"What is the most beautiful thing about science that you love",
					type:"RegularPost"	
				},
				{
					question:"Where do you see science in the next five years",
					type:"RegularPost"
				}
			]
		},
		{ industry:"Engineering",
			backgroundColor:"linear-gradient(to right, #0cebeb, #00eae2, #00e9d8, #00e8cd, #00e6c2, #0de7bf, #18e9bb, #22eab7, #24efbb, #25f4be, #27fac2, #29ffc6",
			solidBackgroundColor:"#0cebeb",
			subCommunity:[
					{industry:"Mechanical Engineering"},
					{industry:"Computer Engineering"},
					{industry:"Electrical Engineering"},
					{industry:"Civil Engineering"},
					{industry:"Chemical Engineering"},
				],id:2,
				specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Engineering Achievments"
						},
						{
							question:"Recommended Books"
						}
					],
					regularPostQuestion:[
						{
							question:"Engineering tutoring services"
						}
					]	
				},
			popularQuestions:[
				{
					question:"List one thing school didn't teach you that you had to learn the hard way on the job :)",
					type:"RegularPost"
				},
				{
					question:"One interesting engineering problem that you solved this week",
					type:"RegularPost"	
				},
				{
					question:"Advice from seasoned engineers to people who are just starting out in their respective fields",
					type:"Image"
				}
			]
		},
		{ industry:"Mathematics",
			backgroundColor:"linear-gradient(to right,#E44D26 0%,#F16529 100%)",
			solidBackgroundColor:"#E44D26",
			subCommunity:[
					{industry:"Algebra"},
					{industry:"Calculus 1"},
					{industry:"Calculus 2"},
					{industry:"Calculus 3"},
					{industry:"Calculus 4"},
					{industry:"Geometry"},
					{industry:"Topology"},
					{industry:"Combinatorics"},
					{industry:"Logic"},
					{industry:"Number Theory"},
					{industry:"Differential Equations"},
					{industry:"Computation"},
					{industry:"Mathematical Physics"},
					{industry:"Probability and statistics"},
					{industry:"Game Theory"}
				],id:3,
				specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Mathematics Achievments"
						},
						{
							question:"Recommended Books"
						}
					],
					regularPostQuestion:[
						{
							question:"Mathematics tutoring services"
						}
					]	
				},
				popularQuestions:[
					{
						question:"Most elegant equation you’ve seen",
						type:"RegularPost"
					},
					{
						question:"The one thing that shocked you this week when you were working on mathematics",
						type:"RegularPost"	
					},
					{
						question:"Tell us about a topic you need help understanding",
						type:"RegularPost"
					},
					{
						question:"Where do you see mathematics going in the next ten years or forever",
						type:"RegularPost"
					}
				]
			},
		{ 
			industry:"Economics",
			backgroundColor:"linear-gradient(to right,#0575E6 0%,#021B79 100%)",
			solidBackgroundColor:"#0575E6",
			id:3,
			subCommunity:[
					{industry:"Macroeconomics"},
					{industry:"Microeconomics"},
					{industry:"Growth Theory"},
					{industry:"Information Economics"}
				],
				specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Economics Achievments"
						},
						{
							question:"Recommended Books"
						}
					],
					regularPostQuestion:[
						{
							question:"Economics tutoring services"
						}
					]	
				},
				popularQuestions:[
					{
						question:"Where do you see the economy going in the up and coming months or years",
						type:"RegularPost"
					},
					{
						question:"To what extent should the government intervene in the market? ",
						type:"RegularPost"	
					}
				]
		},
		{ industry:"History",
			backgroundColor:"linear-gradient(to right,#093028 0%,#237A57 100%)",
			solidBackgroundColor:"#093028",
			subCommunity:[
					{industry:"Political History"},
					{industry:"Diplomatics History"},
					{industry:"Cultural History"},
					{industry:"Social History"},
					{industry:"Economic History"},
					{industry:"Intellectual History"}
				],id:1,
				specificIndustryQuestions:{
					regularPostQuestion:[
						{
							question:"History Advisory"
						}
					]	
				},
				popularQuestions:[
					{
						question:"In your opinion, will history ever repeat itself?",
						type:"RegularPost"
					},
					{
						question:"Greatest time period in history",
						type:"RegularPost"	
					}
				]
			},
		{ industry:"Animation",
			backgroundColor:"linear-gradient(to right,#ee0979 0%,#ff6a00 100%)",
			solidBackgroundColor:"#ee0979",
			subCommunity:[
					{industry:"Traditional"},
					{industry:"Digital 2D"},
					{industry:"3D Animation"},
					{industry:"Motion Capture"},
					{industry:"Stop motion"}
				],id:2,
				specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Critique my animation"
						},
						{
							question:"Animation supplies"
						}
					],
					regularPostQuestion:[
						{
							question:"Animation resources"
						}
					]	
				},
				popularQuestions:[
					{
						question:"Whats the future of animation",
						type:"RegularPost"
					},
					{
						question:"Whats the most beautiful animation you’ve seen ",
						type:"RegularPost"	
					},
					{
						question:"Show us the animation you're working on",
						type:"Video"	
					},
					{
						question:"Advice from seasoned animators to new people",
						type:"RegularPost"	
					},{
						question:"Whats current state of the animation industry",
						type:"RegularPost"	
					}
				] 
			},
			/*
			{ industry:"ASMR",backgroundColor:"linear-gradient(to right,#c0c0aa 0%,#1cefff 100%)",id:3,
				subCommunity:[
						{industry:"Physical touch"},
						{industry:"Food"},
						{industry:"Tapping"},
						{industry:"Whispering"}
				],
					popularQuestions:[
						{
							question:"Show us an asmr video that you've made recently",
							type:"Video"
						},
						{
							question:"Best asmr video you’ve watched",
							type:"Video"
						},
						{
							question:"Favorite asmr sounds/ New asmr sounds",
							type:"RegularPost"	
						}
					]
			},
		*/
		{ 
			industry:"Beauty",
			backgroundColor:"linear-gradient(to right,#E44D26 0%,#F16529 100%)",
			solidBackgroundColor:"#E44D26",
			id:1,
			subCommunity:[
						{industry:"Hair Care"},
						{industry:"Nail Care"},
						{industry:"Salon Management"}
				],
				specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Critique my makeup"
						},
						{
							question:"Beauty supplies"
						}
					],
					regularPostQuestion:[
						{
							question:"Beauty resources"
						}
					]	
				},
				popularQuestions:[
					{
						question:"Show us your best look that you've done on yourself or someone else  ",
						type:"Image"
					},
					{
						question:"Show us a new look you've tried recently",
						type:"Image"
					},
					{
						question:"Best Makeup Line",
						type:"RegularPost"
					},
					{
						question:"Worst Makeup you’ve used",
						type:"RegularPost"
					},
					{
						question:"Tips from established makeup people to people who are just starting out",
						type:"RegularPost"	
					}
				]
		},
		{ 
			industry:"Fashion",
			backgroundColor:"linear-gradient(to right,#ff7e5f 0%,#ff7e5f 100%)",
			solidBackgroundColor:"#ff7e5f",
			subCommunity:[
					{industry:"Vintage Fashion Style"},
					{industry:"Bohemian Fashion Style"},
					{industry:"Chic Fashion Style"},
					{industry:"Artsy Fashion Style"},
					{industry:"Sexy Fashion Style"},
					{industry:"Casual Fashion Style"},
					{industry:"Sophisticated Fashion Style"},
					{industry:"Tomboy Fashion Style"}
				],id:2,
				specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Critique my fashion designs"
						},
						{
							question:"Fashion supplies"
						}
					],
					regularPostQuestion:[
						{
							question:"Fashion resources"
						}
					]	
				},
				popularQuestions:[
					{
						question:"Best fashion piece you’ve created or thought about",
						type:"Image"
					},
					{
						question:"Where do you see fashion going in the next couple years?",
						type:"RegularPost"
					},
					{
						question:"What fashion projects are you currently working on?",
						type:"RegularPost"
					}
				]
		},
		{ 
			industry:"DIY",
			backgroundColor:"linear-gradient(to right,#4ECDC4 0%,#556270 100%)",
			solidBackgroundColor:"#4ECDC4",
			id:2,
			popularQuestions:[
				{
					question:"Show us your best DIY project that you’ve done",
					type:"Image"
				},
				{
					question:"Quick DIY hacks and tricks",
					type:"RegularPost"
				}
			],
			specificIndustryQuestions:{
				imageQuestion:[
					{
						question:"Selling DIY items"
					}
				],
				regularPostQuestion:[
					{
						question:"DIY tips"
					},
					{
						question:"DIY jobs"
					}
				]	
			}
		 },
		{ 
			industry:"Health",
			backgroundColor:"linear-gradient(to right,#56ab2f 0%,#a8e063 100%)",
			solidBackgroundColor:"#56ab2f",
			id:1,
			subCommunity:[
						{industry:"Food and Nutrition"},
						{industry:"Personal Health Issues"},
						{industry:"Mental Health"}
				],
			popularQuestions:[
					{
						question:"How are you feeling today?",
						type:"RegularPost"
					},
					{
						question:"Whats on your mind?",
						type:"RegularPost"
					},
					{
						question:"Whats one thing that you feel has helped you mentally and physically this week",
						type:"RegularPost"
					}
				],
				specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Health Achievments"
						}
					],
					regularPostQuestion:[
						{
							question:"Health tips"
						},
						{
							question:"Nutrition tips"
						}
					]	
			}

		},
		{ industry:"Fitness",
		  backgroundColor:"linear-gradient(to right,#000428 0%,#004e92 100%)",
			solidBackgroundColor:"#000428",
			subCommunity:[
					{industry:"General Weightlifting"},
					{industry:"Aerobic fitness"},
					{industry:"Flexibility"},
					{industry:"Chest"},
					{industry:"Arms"},
					{industry:"Legs"},
					{industry:"Back"}
				],
		  id:2,
			popularQuestions:[
					{
						question:"Whats your PR for this week",
						type:"RegularPost"
					},
					{
						question:"Milestone",
						type:"RegularPost"
					},
					{
						question:"Products",
						type:"RegularPost"
					},
					{
						question:"What do you usually focus on and how do you train",
						type:"RegularPost"
					},{
						question:"What is your goal",
						type:"RegularPost"
					}
				],
				specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Fitness Achievments"
						}
					],
					regularPostQuestion:[
						{
							question:"Fitness tips"
						},
						{
							question:"Nutrition tips"
						}
					]	
			}
		},
		{ industry:"Dance",
			backgroundColor:"linear-gradient(to right,#F00000 0%,#DC281E 100%)",
			solidBackgroundColor:"#F00000",
			subCommunity:[
					{industry:"Contemporary"},
					{industry:"Ballet"},
					{industry:"Jazz"},
					{industry:"Tap Dance"},
					{industry:"Hip Hop"},
					{industry:"Ballroom"}
				],id:3,
				specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Critique my dance"
						},
						{
							question:"Dance supplies"
						}
					],
					regularPostQuestion:[
						{
							question:"Dance tips"
						}
					]	
				},
			popularQuestions:[
					{
						question:"Whats your goal as a dancer?",
						type:"RegularPost"
					},
					{
						question:"Whats your favorite type of dance and why?",
						type:"RegularPost"
					},
					{
						question:"Any advice from professional dancers to people who are just starting out",
						type:"RegularPost"
					}
				]
		},
		{ industry:"Sports",
			backgroundColor:"linear-gradient(to right,#00d2ff 0%,#928DAB 100%)",
			solidBackgroundColor:"#00d2ff",
			subCommunity:[
					{industry:"Soccer"},
					{industry:"Cricket"},
					{industry:"Field Hockey"},
					{industry:"Tennis"},
					{industry:"Volleyball"},
					{industry:"Table Tennis"},
					{industry:"Football"},
					{industry:"Basketball"},
					{industry:"Baseball"},
					{industry:"Golf"},
					{industry:"Rugby"}
				],id:2,
				specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Sport supplies"
						}
					],
					videoQuestion:[
						{
							question:"Showcase your highlight reel"
						}
					]
				},
			popularQuestions:[
					{
						question:"Show us your best tricks shots you've done",
						type:"Video"
					},
					{
						question:"Who is the got of all sports?",
						type:"RegularPost"
					},
					{
						question:"Show us your highlight reel",
						type:"RegularPost"
					}
				]
		},
		{ 
			industry:"Technology",
			backgroundColor:"linear-gradient(to right,#FF5F6D 0%,#FFC371 100%)",
			solidBackgroundColor:"#FF5F6D",
			id:3,
			subCommunity:[
					{industry:"Gadgets and Devices"},
					{industry:"App Reviews and App Comparisons"},
					{industry:"New in Industry"},
					{industry:"Blockchain technology"},
					{industry:"Cloud computing"},
					{industry:"Artificial intelligence"},
					{industry:"Virtual Reality"},
					{industry:"Automation"},
					{industry:"Digital Marketing"},
					{industry:"E-commerce"},
					{industry:"Internet of things"}
			],
			specificIndustryQuestions:{
					imageQuestion:[
						{
							question:"Technological Achievments"
						},
						{
							question:"Recommended Books"
						}
					],
					regularPostQuestion:[
						{
							question:"Technology tutoring services"
						}
					]	
				},
			popularQuestions:[
					{
						question:"Where do you see technology going in the next couple years?",
						type:"RegularPost"
					},
					{
						question:"Show us something you’ve built and are impressed by :)",
						type:"RegularPost"
					},
					{
						question:"Tell us about the craziest technology ideas you can think of that you want to build ",
						type:"RegularPost"
					}
				]
			},
		{ 
			industry:"Travel",
			backgroundColor:"linear-gradient(to right,#1e3c72 0%,#2a5298 100%)",
			solidBackgroundColor:"#1e3c72",
			id:1,
			subCommunity:[
					{industry:"Accommodation"},
					{industry:"Concerns"},
					{industry:"Events"},
					{industry:"Work"},
					{industry:"Activities"},
					{industry:"Health"},
					{industry:"Transportation"},
					{industry:"Natural wonders"}
			],
			specificIndustryQuestions:{
					regularPostQuestion:[
						{
							question:"Travel Advisory"
						}
					]	
			},
				popularQuestions:[
						{
							question:"Show us the most beautiful location you've been to",
							type:"Image"
						},
						{
							question:"Show us a secret location that is beautiful but nobody knows about",
							type:"Image"
						},
						{
							question:"Give everyone travel tips and guides",
							type:"RegularPost"
						},
						{
							question:"What are the best locations to travel to?",
							type:"RegularPost"
						}
					]
		},{
			industry:"Comedy",
			backgroundColor:"linear-gradient(to right,#f4c4f3 0%,#fc67fa 100%)",
			solidBackgroundColor:"#f4c4f3",
			id:1,
			subCommunity:[
					{industry:"Anti-humor"},
					{industry:"Observational comedy"},
					{industry:"Dark Humor"},
					{industry:"Political Satire"}
			],
			specificIndustryQuestions:{
					videoQuestion:[
						{
							question:'Review my set'
						},
						{
							question:'Featured sets'
						}
					],
					regularPostQuestion:[
						{
							question:"Comedy Advisory"
						}
					]	
			},
				popularQuestions:[
						{
							question:"Tell us the best joke youve heard",
							type:"RegularPost"
						},
						{
							question:"How is comedy currently changing?",
							type:"RegularPost"
						},
						{
							question:"Whos the best comedian in your opinion and why?",
							type:"RegularPost"
						},
						{
							question:"Any advice from professional comedians to people who are just starting out?",
							type:"RegularPost"
						}
					]
		},{
				industry:"Conspiracy",
				backgroundColor:"linear-gradient(to right,#41295a 0%,#2F0743 100%)",
				solidBackgroundColor:"#41295a",
				id:1,
				subCommunity:[
						{industry:"Avaition"},
						{industry:"Business and industry"},
						{industry:"Deaths and disappearances"},
						{industry:"Economics and society"},
						{industry:"Ethinicty,race, and religion"},
						{industry:"UFOs and Extraterrestrial"},
						{industry:"Govermnet,politics and conflict"},
						{industry:"Medicine"},
						{industry:"Science and technology"},
						{industry:"Space Agencies"},
						{industry:"Sports"}
				],
				specificIndustryQuestions:{
					regularPostQuestion:[
						{
							question:"Conspiracy Advisory"
						}
					]	
				},
				popularQuestions:[
						{
							question:"Best conspiracy theory you’ve heard",
							type:"RegularPost"
						},
						{
							question:"Most ridiculous theory you’ve heard",
							type:"RegularPost"
						},
						{
							question:"What conspiracy are you currently thinking about?",
							type:"RegularPost"
						}
					]
		},{

			industry:"Religion",
			backgroundColor:"linear-gradient(to right, #0052d4, #4364f7, #6fb1fc)",
			solidBackgroundColor:"#0052d4",
			id:1,
			subCommunity:[
					{industry:"Christianity"},
					{industry:"Mormonism"},
					{industry:"Buddhism"},
					{industry:"Judaism"},
					{industry:"Hinduism"}
			],
			popularQuestions:[
					{
						question:"How do you feel about the current state of religion?",
						type:"RegularPost"
					},
					{
						question:"Most beautiful religious centers in the world",
						type:"Image"
					},
					{
						question:"What religion do you admire the most?",
						type:"RegularPost"
					}
				]
		},{
			industry:"Philosophy",
			backgroundColor:"linear-gradient(to right, #093028, #237a57)",
			solidBackgroundColor:"#093028",
			id:1,
			subCommunity:[
					{industry:"Metaphysics"},
					{industry:"Epistemology"},
					{industry:"Ethics"},
					{industry:"Politics"},
					{industry:"Aesthetics"}
			],
			popularQuestions:[
					{
						question:" What does it mean to live a good life?",
						type:"RegularPost"
					},
					{
						question:"Where do you find meaning in your life?",
						type:"RegularPost"
					},
					{
						question:"Is suffering a necessary part of the human condition?",
						type:"RegularPost"
					}
				]
		},{
			industry:"Entrepreneurship",
			backgroundColor:"linear-gradient(to right, #0f2027, #203a43, #2c5364)",
			solidBackgroundColor:"#0f2027",
			id:1,
			subCommunity:[
					{industry:"Marketing"},
					{industry:"Growth"},
					{industry:"Feedback"},
					{industry:"Ideas And Validation"},
					{industry:"Development"}
			],
			specificIndustryQuestions:{
				imageQuestion:[
					{
						question:"Showcase your startup"
					}
				],
				regularPostQuestion:[
					{
						question:"Marketing tips"
					}
				]
			},
			popularQuestions:[
					{
						question:"Milestones",
						type:"RegularPost"
					},
					{
						question:"Show a picture of your companies team/workspace. Best one wins",
						type:"Image"
					},
					{
						question:"Does hustle=success or does luck play a part?",
						type:"RegularPost"
					}
				]
		},{
			industry:"Cars",
			backgroundColor:"linear-gradient(to right, #3e5151, #decba4)",
			solidBackgroundColor:"#3e5151",
			id:1,
			subCommunity:[
					{industry:"Models"},
					{industry:"Car Technologies and Innovation"},
					{industry:"Car Shows and Expos"},
					{industry:"Collectibles"},
					{industry:"Gear and Accessories"},
					{industry:"Buyer’s Guide"}
			],
			specificIndustryQuestions:{
				imageQuestion:[
					{
						question:"Selling cars/car items"
					}
				],
				regularPostQuestion:[
					{
						question:"Cars tips"
					},
					{
						question:"Car jobs"
					}
				]	
			},
			popularQuestions:[
					{
						question:"Best car you've seen",
						type:"Image"
					},
					{
						question:"What made you start loving cars?",
						type:"RegularPost"
					},
					{
						question:"If you could only drive in one car for the rest of your life, what would you pick?",
						type:"RegularPost"
					}
				]
		}/*,{
			industry:"Animals",backgroundColor:"linear-gradient(to right, #00b09b, #96c93d)",id:1,
				subCommunity:[
						{industry:"Dogs"},
						{industry:"Cats"},
						{industry:"Wolves"},
						{industry:"Dolphins"},
						{industry:"Tiger"},
						{industry:"Penguins"},
						{industry:"Lions"},
						{industry:"Horse"},
						{industry:"Fox"},
						{industry:"Panda"}
				],
				popularQuestions:[
						{
							question:"Best conspiracy theory you’ve heard",
							type:"RegularPost"
						},
						{
							question:"Most ridiculous theory you’ve heard",
							type:"RegularPost"
						},
						{
							question:"What conspiracy are you currently thinking about?",
							type:"RegularPost"
						}
					]
		}
		*/
	]
};