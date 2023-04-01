import { useEffect, useState } from "react";
import { Card } from "./Card";

type TypeImageItem = {
    id: number;
    double: number; 
    src: string;
    isFlipped: boolean;
    isActive: boolean;
}

export const App = () => {

    const [images, setImages] = useState<TypeImageItem[]>([
        { id: 1, double: 1, isFlipped: false, isActive: true, src: './assets/helmet-1.png' },
        { id: 2, double: 2, isFlipped: false, isActive: true, src: './assets/potion-1.png' },
        { id: 3, double: 3, isFlipped: false, isActive: true, src: './assets/ring-1.png' },
        { id: 4, double: 4, isFlipped: false, isActive: true, src: './assets/scroll-1.png' },
        { id: 5, double: 5, isFlipped: false, isActive: true, src: './assets/shield-1.png' },
        { id: 6, double: 6, isFlipped: false, isActive: true, src: './assets/sword-1.png' },
        { id: 7, double: 1, isFlipped: false, isActive: true, src: './assets/helmet-1.png' },
        { id: 8, double: 2, isFlipped: false, isActive: true, src: './assets/potion-1.png' },
        { id: 9, double: 3, isFlipped: false, isActive: true, src: './assets/ring-1.png' },
        { id: 10, double: 4, isFlipped: false, isActive: true, src: './assets/scroll-1.png' },
        { id: 11, double: 5, isFlipped: false, isActive: true, src: './assets/shield-1.png' },
        { id: 12, double: 6, isFlipped: false, isActive: true, src: './assets/sword-1.png' },
    ]);
    const [firstRender, setFirstRender] = useState<boolean>(true);
    const [isClickable, setIsClickable] = useState<boolean>(true);
    const [doubleFlip, setDoubleFlip] = useState<TypeImageItem[]>([]);

    const sortImages = (array: TypeImageItem[]) => [...array].sort(() => Math.random() - 0.5)

    useEffect(() => {
        firstRender && setImages(sortImages(images));
        setFirstRender(false);

        if(doubleFlip.length === 2){
            if(doubleFlip[0].double !== doubleFlip[1].double){
                const flipImages = images.map(value => {
                    if(value.id === doubleFlip[0].id || value.id === doubleFlip[1].id){
                        value.isFlipped = false;
                        value.isActive = true;
                    }
                    return value;
                })

                setTimeout(() => {
                    setImages(flipImages);
                }, 500)
            }
            setTimeout(() => {
                setDoubleFlip([]);
                setIsClickable(true);
            }, 500);
        }

    }, [doubleFlip, firstRender, images])

    const handleCardClick = (id: number) => {
        if(isClickable){
            const cardIsActive = images.find(value => value.id === id)?.isActive;

            if(cardIsActive){
                const newImageSet = images.map(value => {
                    if(value.id === id){
                        value.isFlipped = true;
                        value.isActive = false;
                    }
                    return value;
                })

                setImages(newImageSet);
                
                const cardItem = images.find(value => value.id === id);
                const cardArray = [...doubleFlip];
                if(cardItem && !cardArray.find(value => cardItem.id === value.id)){
                    cardArray.push(cardItem)
                    if(cardArray.length === 2){
                        setIsClickable(false);
                    }
                    setDoubleFlip(cardArray)
                }


            }
        }
    }

    const handleNewGame = () => {
        setIsClickable(false);
        setDoubleFlip([]);
        setImages(images.map(value => {
            if(value.isFlipped){
                value.isFlipped = false;
                value.isActive = true;
            }

            return value;
        }))

        setTimeout(() => {
            const newSortedImages = sortImages([...images]) 
            setImages(newSortedImages);
            setIsClickable(true);
        }, 500);
    }

    return(
        <div>
            <h1 className="text-center mt-5">Magic Match</h1>
            <button className="button d-block mx-auto my-4" onClick={handleNewGame}>New Game</button>
            <div className="card-container pt-2 mx-auto d-flex flex-wrap gap-3 justify-content-center">
                {
                    images.map((value) => <Card key={value.id} id={value.id} imageSrc={value.src} isFlipped={value.isFlipped} onCardClick={handleCardClick} />)
                }
            </div>
        </div>
    )
}