import ReactCardFlip from 'react-card-flip';

export const Card = ({isFlipped, id, imageSrc, onCardClick}: {isFlipped: boolean, id: number, imageSrc: string, onCardClick: (id: number) => void}) => {
    return(
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div className='card-item'>
                <img onClick={() => onCardClick(id)} src={require('./assets/cover.png')} alt="cover" />
            </div>
            <div className='card-item'>
                <img onClick={() => onCardClick(id)} src={require(`${imageSrc}`)} alt='front' />
            </div>
        </ReactCardFlip>
    )
}