import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Book from "../components/Book";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

function Saved() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getSavedBooks();
  }, []);

  const getSavedBooks = () => {
    API.getSavedBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  };

  const handleBookDelete = (id) => {
    API.deleteBook(id).then((res) => {
      getSavedBooks();
      return res;
    });
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
      </Row>
      <Row>
        <Col size="md-12">
          <Card title="Saved Books" icon="download">
            {books.length ? (
              <List>
                {books.map((book) => (
                  <Book
                    key={book._id}
                    title={book.title}
                    subtitle={book.subtitle}
                    link={book.link}
                    authors={book.authors.join(", ")}
                    description={book.description}
                    image={book.image}
                    Button={() => (
                      <button
                        onClick={() => handleBookDelete(book._id)}
                        className="btn btn-danger ml-2"
                      >
                        Delete
                      </button>
                    )}
                  />
                ))}
              </List>
            ) : (
              <h2 className="text-center">No Books Saved...</h2>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Saved;
