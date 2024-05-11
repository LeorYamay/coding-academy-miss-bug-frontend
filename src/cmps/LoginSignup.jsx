import { useState, useEffect } from 'react'
import { userService } from '../services/user.service.js'
// import { ImgUploader } from './ImgUploader'

export function LoginSignup({ onSignup, onLogin }) {
    const [users, setUsers] = useState([])
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const [isSignup, setIsSignup] = useState(false)

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        try {
            const users = await userService.getUsers()
            setUsers(users)
        } catch (err) {
            console.log('Had issues loading users', err);
        }
    }

    function clearState() {
        setCredentials(userService.getEmptyUser())
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(prevCredentials => ({ ...prevCredentials, [field]: value }))
    }

    async function onSubmitForm(ev = null) {
        if (ev) ev.preventDefault()
        if (isSignup) {
            if (!credentials.username || !credentials.password || !credentials.fullname) return
            await onSignup(credentials)
        } else {
            if (!credentials.username) return
            await onLogin(credentials)
        }
        clearState()
    }

    function toggleSignup() {
        setIsSignup(prevIsSignup => !prevIsSignup)
    }

    // function onUploaded(imgUrl) {
    //     setCredentials(prevCredentials => ({ ...prevCredentials, imgUrl }))
    // }
    return (
        <div className="login-page">
            <button className="btn-link" onClick={toggleSignup}>{!isSignup ? 'Not a user? Signup' : 'Already a user? Login'}</button>
            {!isSignup && <form className="login-form" onSubmit={onSubmitForm}>
                <select
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                >
                    <option value="">Select User</option>
                    {
                        users.map(user =>
                            <option key={user._id} value={user.username}>
                                {user.fullname}
                            </option>)
                    }
                </select>
                {/* <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    /> */}
                <button>Login!</button>
            </form>}
            <div className="signup-section">
                {
                    isSignup && <form className="signup-form" onSubmit={onSubmitForm}>
                        <input
                            type="text"
                            name="fullname"
                            value={credentials.fullname}
                            placeholder="Fullname"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        {/* <ImgUploader onUploaded={onUploaded} /> */}
                        <button >Signup!</button>
                    </form>
                }
            </div>
        </div>
    )
}