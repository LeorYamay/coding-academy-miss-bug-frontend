
import { useState } from 'react'
import { bugService } from '../services/bug.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


export function BugDetails() {

    const [bug, setBug] = useState(null)
    const { bugId } = useParams()

    useEffect(() => {
        loadBug()
    }, [])

    async function loadBug() {
        try {
            const bug = await bugService.getById(bugId)
            setBug(bug)
        } catch (err) {
            console.log(err)
            if (err.response.data === 'Wait for a bit')
            {
                showErrorMsg('Wait for a bit')
            }
            else{
                showErrorMsg('Cannot load bug')
            }

        }
    }

    if (!bug) return <h1>loadings....</h1>
    return <div className="bug-details container">
        <h3>Bug Details 🐛</h3>
        <h4>{bug.title}</h4>
        <p>Severity: <span>{bug.severity}</span></p>
        <p>Description: <span>{bug.description}</span></p>
        <Link to="/bug">Back to List</Link>
    </div>

}

