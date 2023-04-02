
import { useState } from "react";


export const usePasswordInput = () => {


    const [passwordErrorText, setPasswordErrorText] = useState('')
    const [passwordErrorStatus, setPasswordErrorSatatus] = useState(false)
    const [password, setPassword] = useState('')


    const handleErrorPassword = (currentPassword: string) => {

        if (currentPassword.length < 6 && currentPassword !== '') {
            setPasswordErrorSatatus(true)
            setPasswordErrorText('Password tidak kurang dari 6 karakter')
        } else if (currentPassword === '' || !(currentPassword.length < 6)) {
            setPasswordErrorSatatus(false)
            setPasswordErrorText('')
        }

    }

    const handleChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const currentPassword = e.target.value
        handleErrorPassword(currentPassword)
        setPassword(currentPassword)
    }

    const handleChangeErrorPasswordStatus = (newStatus: boolean) => setPasswordErrorSatatus(newStatus)

    const handleChangeErrorPasswordText = (newText: string) => setPasswordErrorText(newText)

    return {
        passwordErrorText,
        password,
        passwordErrorStatus,
        handleChangePassword,
        handleChangeErrorPasswordStatus,
        handleChangeErrorPasswordText
    }

}
