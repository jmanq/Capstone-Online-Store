import Pizza from "./Pizza";

const Home = (props) => {
    return (
        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {
                props.data.map((pizza) => (
                  <Pizza key={pizza._id} data={pizza} />
                ))
              }
            </div>
    );
};

export default Home;