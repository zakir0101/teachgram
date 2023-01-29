import {Button, Card, Col, Container, Form, FormGroup, Row} from "react-bootstrap";
import person from "./icon/person.svg";


function About(props) {
    return (

        <Container fluid className={props.className}>
            <Container>
                <div className={"mt-5 mb-5"}>
                    <h2>Our Vision</h2>
                    <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda harum nam nisi. Accusamus accusantium blanditiis esse, iusto laborum magnam praesentium rem rerum soluta voluptate. Minus mollitia natus possimus repudiandae voluptatem.</span><span>Alias aliquid architecto aspernatur atque deleniti dignissimos ea eligendi eos facere illo, illum iusto laudantium maiores nihil nobis officia porro quas quia quis repudiandae rerum soluta sunt unde vero voluptas.</span><span>A ab corporis cum distinctio dolor dolorem eius expedita incidunt libero magnam maiores molestiae natus nemo, nostrum perspiciatis quis repellat rerum sapiente similique velit veritatis voluptas voluptate. Accusamus eaque, repudiandae!</span>
                    </p>
                    <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ducimus facilis, minus nesciunt nobis, placeat qui repellendus reprehenderit sit tempore veniam voluptas voluptatem voluptatum? Nulla perspiciatis qui quos rem unde!</span><span>Architecto distinctio expedita molestiae quisquam? A animi dolor eos excepturi expedita fuga labore minima nihil perspiciatis, quas sapiente, sed voluptate voluptatum. A dicta, ea harum iste nemo nesciunt possimus. Harum.</span><span>Aliquid culpa distinctio excepturi id illum, magnam maiores perferendis perspiciatis porro provident qui quibusdam, sapiente similique. Cupiditate delectus doloremque dolores exercitationem magnam modi natus necessitatibus nihil quasi, quidem, quo, sapiente!</span><span>Accusamus amet animi consequatur corporis culpa cumque cupiditate debitis dignissimos, earum et illum impedit laudantium natus necessitatibus non nostrum numquam praesentium quam quasi quia quo recusandae repellendus ut velit veniam!</span><span>Ad at, fugiat hic id in incidunt quaerat quo saepe voluptates voluptatum. Accusantium earum eos esse facilis fuga impedit in, incidunt laudantium nemo numquam quasi quod, ratione rem totam vero.</span><span>Aliquid animi asperiores commodi laborum molestiae, non odio, quasi quidem quis, quos recusandae repudiandae rerum sed tempora ut! Ad aperiam atque dolores eius et modi tenetur veritatis? Iure, placeat, quisquam.</span>
                    </p>
                </div>
                <div className={"mb-5"}>
                    <h2>Contact us</h2>
                    <Row>
                        <Col xs={12} lg={6}>
                            <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda harum nam nisi. Accusamus accusantium blanditiis esse, iusto laborum magnam praesentium rem rerum soluta voluptate. Minus mollitia natus possimus repudiandae voluptatem.</span><span>Alias aliquid architecto aspernatur atque deleniti dignissimos ea eligendi eos facere illo, illum iusto laudantium maiores nihil nobis officia porro quas quia quis repudiandae rerum soluta sunt unde vero voluptas.</span><span>A ab corporis cum distinctio dolor dolorem eius expedita incidunt libero magnam maiores molestiae natus nemo, nostrum perspiciatis quis repellat rerum sapiente similique velit veritatis voluptas voluptate. Accusamus eaque, repudiandae!</span>
                            </p>
                            <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ducimus facilis, minus nesciunt nobis, placeat qui repellendus reprehenderit sit tempore veniam voluptas voluptatem voluptatum? Nulla perspiciatis qui quos rem unde!</span><span>Architecto distinctio expedita molestiae quisquam? A animi dolor eos excepturi expedita fuga labore minima nihil perspiciatis, quas sapiente, sed voluptate voluptatum. A dicta, ea harum iste nemo nesciunt possimus. Harum.</span><span>Aliquid culpa distinctio excepturi id illum, magnam maiores perferendis perspiciatis porro provident qui quibusdam, sapiente similique. Cupiditate delectus doloremque dolores exercitationem magnam modi natus necessitatibus nihil quasi, quidem, quo, sapiente!</span><span>Accusamus amet animi consequatur corporis culpa cumque cupiditate debitis dignissimos, earum et illum impedit laudantium natus necessitatibus non nostrum numquam praesentium quam quasi quia quo recusandae repellendus ut velit veniam!</span><span>Ad at, fugiat hic id in incidunt quaerat quo saepe voluptates voluptatum. Accusantium earum eos esse facilis fuga impedit in, incidunt laudantium nemo numquam quasi quod, ratione rem totam vero.</span><span>Aliquid animi asperiores commodi laborum molestiae, non odio, quasi quidem quis, quos recusandae repudiandae rerum sed tempora ut! Ad aperiam atque dolores eius et modi tenetur veritatis? Iure, placeat, quisquam.</span>
                            </p>

                        </Col>
                        <Col xs={12} lg={6}>
                            <div className={"border bg-light-subtle border-1 p-3 border-opacity-10"}>
                                <h3 className={"mb-3 "}>Form</h3>
                                <Form>
                                    <FormGroup className={"mb-3"}>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type={"email"} placeholder={"Enter your Email"}/>
                                    </FormGroup>
                                    <Row>
                                        <Col xs={6}>
                                            <FormGroup className={"mb-3"}>
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control type={"text"} placeholder={"Enter your Email"}/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type={"text"} placeholder={"Enter your Email"}/>
                                        </Col>
                                    </Row>
                                    <FormGroup className={"mb-3"}>
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type={"text"} placeholder={"Enter your phone number"}/>
                                    </FormGroup>

                                    <FormGroup className={"mb-3"}>
                                        <Form.Label>Address</Form.Label>
                                        <Row>
                                            <Col xs={12} md={"6"} className={"mb-2 mb-md-0"}>
                                                <Form.Control type={"text"} placeholder={"Street Number"}/>
                                            </Col>
                                            <Col xs={8} md={4}>
                                                <Form.Control type={"text"} placeholder={"City"}/>
                                            </Col>
                                            <Col xs={4} md={2}>
                                                <Form.Control type={"text"} placeholder={"PLZ"}/>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup className={"mb-3"}>
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control as={"textarea"} style={{height: "5.5rem"}}/>
                                    </FormGroup>
                                    <Button variant={"primary"} size={"lg"}>Submit</Button>
                                </Form>
                            </div>

                        </Col>
                    </Row>
                </div>
                <div className={"mb-5"}>
                    <h2>Team</h2>
                    <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda harum nam nisi. Accusamus accusantium blanditiis esse, iusto laborum magnam praesentium rem rerum soluta voluptate. Minus mollitia natus possimus repudiandae voluptatem.</span><span>Alias aliquid architecto aspernatur atque deleniti dignissimos ea eligendi eos facere illo, illum iusto laudantium maiores nihil nobis officia porro quas quia quis repudiandae rerum soluta sunt unde vero voluptas.</span><span>A ab corporis cum distinctio dolor dolorem eius expedita incidunt libero magnam maiores molestiae natus nemo, nostrum perspiciatis quis repellat rerum sapiente similique velit veritatis voluptas voluptate. Accusamus eaque, repudiandae!</span>
                    </p>
                    <div className={"d-flex flex-wrap gap-4 mt-5 justify-content-center "}>
                        {["Zakir", 'Abdelrahman', 'Mamoun', 'Alsadiq'].map(name =>
                            <Card key={name + "$"} style={{width: '16rem'}}>
                                <Card.Img variant="top" src={person}/>
                                <Card.Body>
                                    <Card.Title>{name}</Card.Title>
                                    <Card.Text>
                                        Some quick example text
                                    </Card.Text>
                                    <Button variant="primary">Visit Website</Button>
                                </Card.Body>
                            </Card>
                        )}


                    </div>

                </div>

            </Container>

        </Container>);
}


export {About}