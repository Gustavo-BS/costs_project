import styles from './Input.module.css'

function Input({ type, text, name, placehoulder, handleOnChange, value }){
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input 
             type={type} 
             name={name} 
             id={name}
             placeholder={placehoulder} 
             onChange={handleOnChange}
             value={value}
             />
        </div>
    )
}

export default Input