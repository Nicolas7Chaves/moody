import './styles.scss'

function Post() {
    const handleSubmit = (e) => {

    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="What do you want to post?" />
            <button type='submit'>Post</button>
        </form>
        </>
    )
}