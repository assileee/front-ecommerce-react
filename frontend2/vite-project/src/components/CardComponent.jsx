
const CardComponent = ({ title, description, price, imageUrl }) => {
    return (
      <article className="col">
        <div className="card shadow-sm">
          <img
            src={imageUrl}   // <-- Now dynamic!
            className="card-img-top"
            alt={title}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <strong>Price: ${price}</strong>
            </p>
            <div className="d-flex justify-content-end align-items-center">
              <div>
                <button type="button" className="btn btn-sm btn-outline-secondary">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }
  

export default CardComponent