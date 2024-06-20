import { useState } from "react";
import {
  Row,
  Col,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
  Container,
} from "react-bootstrap";

import NewsList from "./Components/NewsList";

function App() {
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryClick = (cetegory) => {
    setCategory(cetegory);
    setSearchTerm("");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setCategory("");
    setSearchTerm(event.target.search.value);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/" className="fw-bold fs-4">
            News App
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto fw">
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" className="mt-2">
                  Categories
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleCategoryClick("world")}>
                    World
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleCategoryClick("business")}
                  >
                    Business
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleCategoryClick("technology")}
                  >
                    Technology
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategoryClick("sports")}>
                    Sports
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleCategoryClick("entertainment")}
                  >
                    Entertainment
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>

            <Form onSubmit={handleSearch} className="d-flex align-items-center">
              <FormControl
                type="text"
                placeholder="Search"
                className="me-2 mt-2"
                name="search"
              />

              <Button variant="outline-primary" type="submit" style={{ height: '35px', lineHeight: '35px', padding: '0 15px' }} className="me-2 mt-2">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          
          <Col xs={12} md={12} sm={12}>
            <NewsList category={category} searchTerm={searchTerm} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
