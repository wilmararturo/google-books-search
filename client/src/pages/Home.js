import React, { useState } from "react";
import Card from "../components/Card";
import Form from "../components/Form";
import Book from "../components/Book";
import Hero from "../components/Hero";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

function Home() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("Enter the title of a book to start");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  const getBooks = () => {
    API.getBooks(query)
      .then((res) => setBooks(res.data))
      .catch(() => {
        setBooks([]);
        setMessage("No results, try again");
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    getBooks();
  };

  const handleBookSave = (id) => {
    const book = books.find((book) => book.id === id);

    API.saveBook({
      googleId: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail,
    }).then(() => getBooks());
  };

  return (
    <Container>
      <Row>
        <Col size="md-12">
          <Hero>
            <h1 className="text-center">
              <strong>Google Books Search</strong>
            </h1>
            <h2 className="text-center">Find and Save Books of Interest.</h2>
          </Hero>
        </Col>
        <Col size="md-12">
          <Card title="Book Search" icon="far fa-book">
            <Form
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
              q={query}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col size="md-12">
          <Card title="Results">
            {books.length ? (
              <List>
                {books.map((book) => (
                  <Book
                    key={book.id}
                    title={book.volumeInfo.title}
                    subtitle={book.volumeInfo.subtitle}
                    link={book.volumeInfo.infoLink}
                    authors={book.volumeInfo.authors.join(", ")}
                    description={book.volumeInfo.description}
                    image={book.volumeInfo.imageLinks.thumbnail}
                    Button={() => (
                      <button
                        onClick={() => handleBookSave(book.id)}
                        className="btn btn-primary ml-2"
                      >
                        Save
                      </button>
                    )}
                  />
                ))}
              </List>
            ) : (
              <h2 className="text-center">{message}</h2>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
