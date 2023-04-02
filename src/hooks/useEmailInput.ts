
import { useState } from "react";

type InitialValueProps = {
    initialValue?: string
}

export const useEmailInput = ({ initialValue }: InitialValueProps) => {

    const regxValidEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const [email, setEmail] = useState(() => {
        const getInitialValue = () => {
            if (initialValue) {
                return initialValue
            }
            return ''
        }
        return getInitialValue()
    })
    const [emailErrorStatus, setEmailErrorStatus] = useState(false)
    const [emailErrorText, setEmailErrorText] = useState('')

    const handleErrorEmail = (currentEmail: string) => {

        if (!regxValidEmail.test(currentEmail) && currentEmail !== '') {
            setEmailErrorStatus(true)
            setEmailErrorText('Invalid Email')
        } else if (currentEmail === '' || regxValidEmail.test(currentEmail)) {
            setEmailErrorStatus(false)
            setEmailErrorText('')
        }
    }

    const handleChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const currentEmail = e.target.value
        handleErrorEmail(currentEmail)
        setEmail(currentEmail)
    }

    const handleChangeErrorText = (errorText: string) => setEmailErrorText(errorText)
    const handleChangeErrorStatus = (errorStatus: boolean) => setEmailErrorStatus(errorStatus)
    const changeEmail = (mail: string) => setEmail(mail)

    return {
        email,
        emailErrorStatus,
        emailErrorText,
        handleChangeEmail,
        handleChangeErrorStatus,
        handleChangeErrorText,
        changeEmail
    }


}
