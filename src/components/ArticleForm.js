import React, {useState} from 'react'

const ArticleForm = ({onSubmit, errors, initialValues}) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [description, setDescription] = useState('')
  const [tagList, setTagList] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    onSubmit({foo: 'dsfsdfs'})
    console.log('fields', title, body, description, tagList)
  }

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            error
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input type="text"
                         className="form-control form-control-lg"
                         placeholder="Article title"
                         value={title}
                         onChange={e => setTitle(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input type="text"
                         className="form-control form-control-lg"
                         placeholder="What is this article about?"
                         value={description}
                         onChange={e => setDescription(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea className="form-control form-control-lg"
                            rows="8"
                            placeholder="Write your article"
                            value={body}
                            onChange={e => setBody(e.target.value)}

                  />
                </fieldset>
                <fieldset className="form-group">
                  <input type="text"
                         className="form-control form-control-lg"
                         placeholder="Tags"
                         value={tagList}
                         onChange={e => setTagList(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <button
                    type="submit"
                    className="btn btn-lg pull-xs-right btn-primary"
                  >Publish article</button>
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleForm