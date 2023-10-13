import { Component, useEffect, useState } from "react";

function NewServe() {
  const hour = new Date().getHours();
  const openHour = 8;
  const closingHour = 20;

  const status =
    hour >= openHour && hour <= closingHour
      ? "Store is currently open"
      : "Sorry! Store is closed Now";

  const [change, setChange] = useState("");

  useEffect(() => {
    try {
      const handleChange = () => {
        setChange(" Thank you for choosing us");
      };
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleClick = () => {
    alert("Welcome to our store!");
  };

  return (
    <div>
      <h2>Welcome Channel</h2>
      <p onClick={handleClick} style={{ color: "green", fontWeight: "bold" }}>
        {status}
        {change}
      </p>
      <Header />
    </div>
  );
}

const Header = () => {
  return (
    <div>
      <nav>
        <a
          href="#"
          style={{
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "20px"
          }}
        >
          Branded Store
        </a>

        <ul
          style={{
            listStyle: "none",
            color: "red",
            fontWeight: "bold",
            float: "right",
            display: "flex",
            gap: "10px"
          }}
        >
          <li>Home</li>
          <li>Link</li>
          <li>Login</li>
          <li>Signup</li>
        </ul>
      </nav>
      <Store />
    </div>
  );
};

function Store() {
  const [image, setImage] = useState([]);

  useEffect(() => {
    const api =
      "https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=20";
    try {
      const fetchData = async () => {
        const imageData = await fetch(api);
        const res = await imageData.json();
        console.log(res);
        setImage(res);
      };
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <h2> View the List of items</h2>
      <div>{image}</div>
      <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
        <div
          style={{
            width: "250px",
            height: "200px",
            color: "black",
            fontWeight: "bold",
            backgroundColor: "yellow"
          }}
        >
          <h4>Card</h4>

          <img
            key={image}
            src={image}
            alt="image"
            style={{ width: "150px", height: "150px" }}
          />
        </div>
        <div
          style={{
            width: "250px",
            height: "200px",
            color: "black",
            fontWeight: "bold",
            backgroundColor: "pink"
          }}
        >
          <h4>Box</h4>
          <Javascpt />
        </div>
      </div>
    </div>
  );
}

const url = "https://api.slingacademy.com/v1/sample-data/photos";

class Javascpt extends Component {
  constructor() {
    super();
    this.state = {
      showImage: ""
    };
  }

  componentDidMount() {
    fetch(`${url}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ showImage: data });
        console.log(data);
      });
  }

  render() {
    return (
      <>
        <ShowNewImage getImage={this.state.showImage} />
      </>
    );
  }
}

const ShowNewImage = (props) => {
  const newFindImage = ({ getImage }) => {
    if (getImage) {
      return getImage.map((item) => {
        return (
          <div>
            {item}
            <img src={item.photos[0].url} />
          </div>
        );
      });
    }
  };

  return <div>{newFindImage(props)}</div>;
};

export default NewServe;
