export const InfoTooltip = ({title, icon, onClose}) => {

    return (
        <div className={`popup popup_type_img popup_opened`}>
            <div className="info-tooltip">
                <img className='info-tooltip__image'
                     src={icon}
                     alt='info window'/>
                <h2 className="info-tooltip__title">{title}</h2>
                <button className="popup__close-btn" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}