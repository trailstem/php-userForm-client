export const Textbox = (props) => {
  return (
    <>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        className={props.className}
      />
    </>
  );
};

export default Textbox;
