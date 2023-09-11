import {InputText} from "primereact/inputtext";

export default function InputCpf({setCpf, error}) {

    return <div className="flex flex-column gap-2">
        <label htmlFor="input-cpf">CPF:</label>
        <InputText id="input-cpf" keyfilter="pnum" onChange={(e) => {
            setCpf(e.target.value)
        }} placeholder={"000.000.000-00"}/>
        {error}
    </div>
}