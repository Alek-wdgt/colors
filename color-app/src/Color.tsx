import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { BsSuitHeart, BsSuitHeartFill, BsTrash , BsCopy, BsArrowDownShort, BsArrowUpShort, BsHearts, BsPlusCircleFill, BsXCircleFill} from "react-icons/bs";
import './Color.css';

interface Color {
    id: number;
    name: string;
    hex_code: string;
    created_at: number;
    clickCount: number;
}

const API_URL = 'http://localhost:8000/api/colors';

const Color: React.FC = () => {
    const [colors, setColors] = useState<Color[]>([]);
    const [newColorName, setNewColorName] = useState('');
    const [newColorHex, setNewColorHex] = useState('');
    const [filterText, setFilterText] = useState<string>('');
    const [favoriteColors, setFavoriteColors] = useState<string[]>([]);
    const [showDiv, setShowDiv] = useState<boolean>(false);
    const colorSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchColors();
    }, []);

    const fetchColors = async () => {
        try {
            const response = await axios.get(API_URL);
            const colorsWithClickCount = response.data.map((color: Color) => ({
                ...color,
                clickCount: 0,
            }));
            setColors(colorsWithClickCount);
        } catch (error) {
            console.error('Error fetching colors:', error);
        }
    };

    const handleCreateColor = async () => {
        try {
            await axios.post(API_URL, {
                name: newColorName,
                hex_code: newColorHex,
            });
            fetchColors();
            setNewColorName('');
            setNewColorHex('');
        } catch (error) {
            console.error('Error creating color:', error);
        }
    };

    const handleDeleteColor = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchColors();
        } catch (error) {
            console.error('Error deleting color:', error);
        }
    };
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFilterText(value); // Update filter text state on input change
    };

    const filteredColors = colors.filter(color =>
        color.name.toLowerCase().includes(filterText.toLowerCase()) ||
        color.hex_code.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleSetFavoriteColor = (hexCode: string) => {
        if (!favoriteColors.includes(hexCode)) {
            setShowDiv(true);
            setFavoriteColors([...favoriteColors, hexCode]);
        }
    };
    const handleCloseFavoriteSection = () => {
        setShowDiv(false); // Set to false to hide the section
    };
    const handleRemoveFavoriteColor = (hexCode: string) => {
        const updatedFavorites = favoriteColors.filter(color => color !== hexCode);
        setFavoriteColors(updatedFavorites);
    };
    const copyHexToClipboard = (hexValue: string) => {
        navigator.clipboard.writeText(hexValue)
            .then(() => {
                alert(`Copied the hex code: ${hexValue}`);
            })
            .catch(err => {
                console.error('Error copying hex code: ', err);
                alert("Unable to copy hex code. Please try again.");
            });
    };
    const sortColors = (field: keyof Color, order: 'asc' | 'desc') => {
        const sortedColors = [...colors].sort((a, b) => {
            const fieldValueA = typeof a[field] === 'string' ? a[field] as string : '';
            const fieldValueB = typeof b[field] === 'string' ? b[field] as string : '';

            if (order === 'asc') {
                return fieldValueA.localeCompare(fieldValueB);
            } else {
                return fieldValueB.localeCompare(fieldValueA);
            }
        });
        setColors(sortedColors);
    };

    const handleIncrementClickCount = (id: number) => {
        const updatedColors = colors.map(color =>
            color.id === id ? { ...color, clickCount: color.clickCount + 1 } : color
        );
        setColors(updatedColors);
    };

    const sortColorsByPopularity = (order: 'asc' | 'desc') => {
        const sortedColors = [...colors].sort((a, b) => {
            if (order === 'asc') {
                return a.clickCount - b.clickCount;
            } else {
                return b.clickCount - a.clickCount;
            }
        });
        setColors(sortedColors);
    };

    const scrollToColorSection = () => {
        if (colorSectionRef.current) {
            colorSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="px-3 lg:px-0">
            <div className="lg:container container-fluid mx-auto">
                <div className="flex w-full mx-auto">
                    <h1 className="text-5xl uppercase text-center mx-auto my-4 p-4">Colors App</h1>
                </div>

                <div className="sticky top-0 flex w-full mx-auto hover:shadow-xl ">
                    <input type="text" className="border hover:border-slate-500 w-full shadow-lg rounded-lg p-6"
                           placeholder="Search for color name..." value={filterText} onChange={handleFilterChange}/>
                </div>

                <div className="grid lg:grid-cols-2 grid-cols bg-neutral-100">
                    <div className="grid lg:grid-cols-3 grid-cols mb-3">
                        <div className="flex p-3 text hover:shadow-sm my-auto ">
                            Sort by name:
                            <a className="cursor-pointer" onClick={() => sortColors('name', 'asc')}><BsArrowUpShort
                                className="text-xl my-auto"/></a>
                            <a className="cursor-pointer" onClick={() => sortColors('name', 'desc')}><BsArrowDownShort
                                className="text-xl my-auto "/></a>
                        </div>
                        <div className="flex p-3 my-auto hover:shadow-sm  ">
                            Sort by date:
                            <a className="cursor-pointer" onClick={() => sortColors('created_at', 'asc')}><BsArrowUpShort
                                className="text-xl my-auto"/>
                            </a>
                            <a className="cursor-pointer" onClick={() => sortColors('created_at', 'desc')}><BsArrowDownShort
                                className="text-xl my-auto"/>
                            </a>
                        </div>
                        <div className="flex p-3 my-auto hover:shadow-sm   with-3d-shadow">
                            Sort by popularity:
                            <a className="cursor-pointer" onClick={() => sortColorsByPopularity('asc')}><BsArrowUpShort
                                className="text-xl my-auto"/></a>
                            <a className="cursor-pointer"
                               onClick={() => sortColorsByPopularity('desc')}><BsArrowDownShort
                                className="text-xl my-auto"/></a>
                        </div>
                    </div>

                    <div className="flex w-fill items-center cursor-pointer m-auto w-auto uppercase text-xl hover:text-bolder text-sm text-bold "
                         onClick={() => scrollToColorSection()}><BsPlusCircleFill className="text-4xl my-auto inline mr-3"/>Add your custom color
                    </div>
                </div>
            </div>

            {favoriteColors.length > 0 && (
                <div className={`transition-all duration-300 transform  bg-neutral-300 flex flex-wrap transition-animation container mx-auto transition-div 
                ${showDiv ? 'active' : ''}`}>
                    <div className="flex flex-row w-full mx-auto">
                        <h2 className="text-3xl p-4 text-center uppercase mx-auto">Favorite Colors</h2>
                        <a onClick={handleCloseFavoriteSection} className="cursor-pointer ml-auto"><BsXCircleFill
                            className="text-3xl text-gray-500 m-4 my-auto hover:text-black"/>
                        </a>
                    </div>
                    <div className="flex flex-row">
                        <div className=" grid my-4 mx-auto w-full gap-4 grid-cols-8 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
                            {favoriteColors.map((hexCode, index) => (
                                <div key={index}
                                     className=" w-full p-4 h-auto h-25 flex flex-col text-xl shadow rounded-md hover:shadow-xl "
                                     style={{
                                         backgroundColor: hexCode, height: '7rem'
                                     }}>
                                    <a onClick={() => handleRemoveFavoriteColor(hexCode)}
                                       className="text-sm flex  h-auto cursor-pointer m-auto">Remove from favorites
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="lg:container container-fluid mx-auto mt-4">
                <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols gap-4">
                    {filteredColors.map(color => (
                        <div key={color.id} className="flex flex-col text-xl shadow rounded-md hover:shadow-xl">
                            <div style={{backgroundColor: color.hex_code}} className="min-h-48"></div>
                            <div className="details flex py-3 flex-col mx-auto text-center">
                                {!favoriteColors.includes(color.hex_code) ? (
                                    <a className="cursor-pointer mx-auto"
                                       onClick={() => handleSetFavoriteColor(color.hex_code)}><BsSuitHeart
                                        className="text-6xl"/>
                                    </a>
                                ) : (
                                    <a className="cursor-pointer mx-auto"
                                       onClick={() => handleRemoveFavoriteColor(color.hex_code)}><BsSuitHeartFill
                                        className="text-6xl transition-animation"/></a>
                                )}
                                <div className="text-2xl  underline font-semibold">{color.name}</div>
                                <div className="uppercase rounded-sm bg-slate-100  flex w-full w-auto mx-auto my-auto px-3 ">
                                    <span className="pr-3">{color.hex_code}</span>
                                    <BsCopy className="cursor-pointer my-auto" onClick={() => copyHexToClipboard(color.hex_code)}/>
                                </div>
                                <div className="text-sm py-3">Likes: {color.clickCount}</div>
                            </div>
                            <div className="bg-slate-100 p-3 flex">
                                <a className="mx-auto hover:shadow-md cursor-pointer" onClick={() => handleDeleteColor(color.id)}>
                                    <BsTrash className="my-auto"/>
                                </a>
                                <a className="hover:shadow-md mx-auto cursor-pointer" onClick={() => handleIncrementClickCount(color.id)}>
                                    <BsHearts className="my-auto"/>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div ref={colorSectionRef}></div>
            <div className="container-fluid bg-neutral-200 w-100 w-full mt-8 p-8">
                <div className="lg:container flex w-full mx-auto">
                    <h2 className="text-5xl text-center mb-8 mx-auto">Didn't find what you were looking for? Create your own color</h2>
                </div>
                <div className="lg:container container-fluid mx-auto flex items-center justify-center flex-wrap">
                    <div className="flex-col flex-wrap grid">
                        <div className="flex p-4 m-auto w-40 h-40 rounded-full shadow-md"
                             style={{backgroundColor: newColorHex}}></div>
                        <div className="flex items-center relative mt-4">
                            <input
                                type="text"
                                aria-label="inputtext"
                                name="inputtext"
                                id="colorname"
                                placeholder=""
                                value={newColorName}
                                onChange={(e) => setNewColorName(e.target.value)}
                                className="w-auto w-full h-14 block leading-5 relative pt-2 px-4 rounded-t text-gray-800 bg-gray-100 dark:bg-gray-700 border-b focus:border-b-2 border-gray-500 border-gray-400 overflow-x-auto focus:outline-none focus:border-primary-600 focus:ring-0 dark:text-gray-200 dark:focus:border-primary-200 peer"
                            />
                            <label htmlFor="colorname"
                                   className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3.5 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:left-4 peer-focus:text-primary-600 dark:peer-focus:text-primary-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-invalid:text-error-600 dark:peer-invalid:text-error-200">Enter your color name</label>
                        </div>

                        <div className="flex relative items-center mt-4">
                            <input
                                type="text"
                                aria-label="inputtext2"
                                name="inputtext"
                                id="hexcode"
                                placeholder=""
                                value={newColorHex}
                                onChange={(e) => setNewColorHex(e.target.value)}
                                className="w-full h-14 block leading-5 relative pt-2 px-4 rounded-t text-gray-800 bg-gray-100 dark:bg-gray-700 border-b focus:border-b-2 border-gray-500 border-gray-400 overflow-x-auto focus:outline-none focus:border-primary-600 focus:ring-0 dark:text-gray-200 dark:focus:border-primary-200 peer"
                            />
                            <label htmlFor="hexcode"
                                   className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3.5 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:left-4 peer-focus:text-primary-600 dark:peer-focus:text-primary-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-invalid:text-error-600 dark:peer-invalid:text-error-200">#Your hex code</label>
                        </div>

                        <a className="rounded-lg bg-gray-25 text-3xl text-black-50 bg-neutral-300 p-4 my-4 hover:bg-neutral-100 text-black-500 border hover:border-black uppercase cursor-pointer border-gray-200" onClick={handleCreateColor}>Create your color</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Color;
