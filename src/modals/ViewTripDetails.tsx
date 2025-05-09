import { useState } from "react";
import { Button, Modal, Image, Col, Row } from "react-bootstrap";
import CustomHeader from "../components/CustomHeader";
import { ViewTripProps } from "../utils/TypesIndex";
import CheckPurple from "../assets/svgs/check-purple.svg";
import XRed from "../assets/svgs/x-red.svg";
import Pending from "../assets/svgs/pending.svg";
import Upcoming from "../assets/svgs/upcoming.svg";
import Ongoing from "../assets/svgs/ongoing.svg";
import Past from "../assets/svgs/past.svg";
import { formatISOString } from "../utils/utilities";

export default function ViewTripDetails({ passedData, type }: ViewTripProps) {
  const [show, setShow] = useState(false);

  // const auth = useAuthUser();
  // const role = auth()?.role ?? "Requisitioner";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {type == "pending" ? (
        <Button size="sm" className="w-100" onClick={handleShow}>
          <i className="bi bi-eye-fill" /> View
        </Button>
      ) : (
        <Button size="sm" className="w-100" onClick={handleShow}>
          <i className="bi bi-eye-fill" /> View Details
        </Button>
      )}

      <Modal show={show} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{passedData.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={8}>
              <CustomHeader title={passedData.title} subtitle={`${formatISOString(passedData.tripStart)} - ${formatISOString(passedData.tripEnd)}`} />
            </Col>
            <Col lg={4}>
              <Row className="">
                <Col lg={6} className="d-flex justify-content-center">
                  {passedData.requestStatus?.toLowerCase() == "approved" ? (
                    <>
                      <Row className="d-flex">
                        <Col className="px-1">
                          <Image className="pe-1" src={CheckPurple} />
                          <span className="text-primary">
                            <strong>Approved</strong>
                          </span>
                        </Col>
                      </Row>
                    </>
                  ) : passedData.requestStatus?.toLowerCase() == "declined" ? (
                    <>
                      <Row className="d-flex">
                        <Col className="px-1">
                          <Image className="pe-2" src={XRed} />
                          <span className="text-danger">
                            <strong>Declined</strong>
                          </span>
                        </Col>
                      </Row>
                    </>
                  ) : (
                    <>
                      <Row className="d-flex">
                        <Col className="px-1">
                          <Image className="pe-2" src={Pending} />
                          <span className="text-primary">
                            <strong>Pending</strong>
                          </span>
                        </Col>
                      </Row>
                    </>
                  )}
                </Col>
                <Col lg={6} className="d-flex justify-content-center">
                  {passedData.tripStatus?.toLowerCase() == "upcoming" ? (
                    <>
                      <Row className="d-flex">
                        <Col className="px-1">
                          <Image className="pe-2" src={Upcoming} />
                          <span className="text-primary">
                            <strong>Upcoming</strong>
                          </span>
                        </Col>
                      </Row>
                    </>
                  ) : passedData.tripStatus?.toLowerCase() == "ongoing" ? (
                    <>
                      <Row className="d-flex">
                        <Col className="px-1">
                          <Image className="pe-2" src={Ongoing} />
                          <span className="text-primary">
                            <strong>Ongoing</strong>
                          </span>
                        </Col>
                      </Row>
                    </>
                  ) : (
                    <>
                      <Row className="d-flex">
                        <Col className="px-1">
                          <Image className="pe-2" src={Past} />
                          <span className="text-secondary">
                            <strong>Past</strong>
                          </span>
                        </Col>
                      </Row>
                    </>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Row>
                <Col lg={3}>
                  <span className="">Department</span>
                </Col>
                <Col lg={9}>
                  <span className="thin-text">{passedData.department.name}</span>
                </Col>
              </Row>
              <Row>
                <Col lg={3}>
                  <span className="">Destination</span>
                </Col>
                <Col lg={9}>
                  <span className="thin-text">{passedData.destination}</span>
                </Col>
              </Row>
              <Row>
                <Col lg={3}>
                  <span className="">Purpose</span>
                </Col>
                <Col lg={9}>
                  <span className="thin-text">{passedData.purpose}</span>
                </Col>
              </Row>
              <Row className="mt-3">
                <Row>
                  <h5 className="text-primary thin-text">Requester Details</h5>
                </Row>
                <Row>
                  <Col lg={3}>
                    <span className="">Requester</span>
                  </Col>
                  <Col lg={9}>
                    <span className="thick-text">
                      {passedData.user?.lastName}, {passedData.user?.firstName}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col lg={3}>
                    <span className="">Contact #</span>
                  </Col>
                  <Col lg={9}>
                    <span className="thin-text">{passedData.user?.contactNumber}</span>
                  </Col>
                </Row>
                <Row>
                  <Col lg={3}>
                    <span className="">Email</span>
                  </Col>
                  <Col lg={9}>
                    <span className="thin-text">{passedData.user?.email}</span>
                  </Col>
                </Row>
                <Row>
                  <Col lg={3}>
                    <span className="">Req. Driver</span>
                  </Col>
                  <Col lg={9}>
                    <span className="thick-text">{passedData.driverRequest ? "Yes" : "No"}</span>
                  </Col>
                </Row>
                <Row>
                  <Col lg={3}>
                    <span className="">Req. Vehicle</span>
                  </Col>
                  <Col lg={9}>
                    <span className="thick-text">{passedData.vehicleRequest ? "Yes" : "No"}</span>
                  </Col>
                </Row>
                <Row>
                  <Col lg={3}>
                    <span className="">Date Req.</span>
                  </Col>
                  <Col lg={9}>
                    <span className="thin-text">{formatISOString(passedData.createdDate)}</span>
                  </Col>
                </Row>
                <Row>
                  <Col lg={3}>
                    <span className="">Last Updated</span>
                  </Col>
                  <Col lg={9}>
                    <span className="thin-text">{formatISOString(passedData.updatedDate)}</span>
                  </Col>
                </Row>
              </Row>
              {passedData.driver && (
                <Row className="mt-3">
                  <Row>
                    <h5 className="text-primary thin-text">Driver Details</h5>
                  </Row>
                  <Row>
                    <Col lg={3}>
                      <span className="">Driver</span>
                    </Col>
                    <Col lg={9}>
                      <span className="thick-text">
                        {passedData.driver.lastName}, {passedData.driver.lastName}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={3}>
                      <span className="">Contact #</span>
                    </Col>
                    <Col lg={9}>
                      <span className="thin-text">{passedData.driver.contactNumber}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={3}>
                      <span className="">Email</span>
                    </Col>
                    <Col lg={9}>
                      <span className="thin-text">{passedData.driver.email}</span>
                    </Col>
                  </Row>
                </Row>
              )}
              {passedData.vehicle && (
                <Row className="mt-3">
                  <Row>
                    <h5 className="text-primary thin-text">Vehicle Details</h5>
                  </Row>
                  <Row>
                    <Col lg={3}>
                      <span className="">Model</span>
                    </Col>
                    <Col lg={9}>
                      <span className="thick-text">{passedData.vehicle.model}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={3}>
                      <span className="">Plate #</span>
                    </Col>
                    <Col lg={9}>
                      <span className="thin-text">{passedData.vehicle.plateNumber}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={3}>
                      <span className="">Seats</span>
                    </Col>
                    <Col lg={9}>
                      <span className="thin-text">{passedData.vehicle.seats ?? "No Data"}</span>
                    </Col>
                  </Row>
                </Row>
              )}
            </Col>
            <Col lg={6}>
              <Row>
                <h5 className="text-primary thin-text">Trip Details</h5>
              </Row>
              <Row>
                <Col lg={3}>
                  <span className="">Time Departure</span>
                </Col>
                <Col lg={9}>
                  <span className="thin-text">{passedData.timeDeparture ? formatISOString(passedData.timeDeparture) : "No Data"}</span>
                </Col>
              </Row>
              <Row>
                <Col lg={3}>
                  <span className="">Time Arrival</span>
                </Col>
                <Col lg={9}>
                  <span className="thin-text">{passedData.timeArrival ? formatISOString(passedData.timeArrival) : "No Data"}</span>
                </Col>
              </Row>
              <Row>
                <Col lg={6} className="mt-2">
                  <Row>
                    <h5 className="text-primary thin-text">Departure Checklist</h5>
                  </Row>
                  {passedData.tripChecklists
                    .filter((check) => check.timing === "Before")
                    .sort((a, b) => {
                      // Prioritize typed === true
                      if (a.checklist.typed === b.checklist.typed) {
                        // Same group, sort by title
                        return a.checklist.title.localeCompare(b.checklist.title);
                      }
                      return a.checklist.typed ? -1 : 1;
                    })
                    .map((checklist, index) => {
                      return (
                        <Row key={`Row-${checklist.id}-${index}`}>
                          <Col lg={8} key={`Col-${checklist.id}-${index}-${checklist.checklist.title}`}>
                            <span className="">{checklist.checklist.title}</span>
                          </Col>
                          <Col lg={4}>
                            <span className="thin-text">
                              {checklist.data.toLowerCase() === "passed" ? (
                                <Image className="pe-1" src={CheckPurple} />
                              ) : checklist.data.toLowerCase() === "failed" ? (
                                <Image className="pe-2" src={XRed} />
                              ) : (
                                checklist.data
                              )}
                            </span>
                          </Col>
                        </Row>
                      );
                    })}
                </Col>
                <Col lg={6} className="mt-2">
                  <Row>
                    <h5 className="text-primary thin-text">Arrival Checklist</h5>
                  </Row>
                  {passedData.tripChecklists
                    .filter((check) => check.timing === "After")
                    .sort((a, b) => {
                      // Prioritize typed === true
                      if (a.checklist.typed === b.checklist.typed) {
                        // Same group, sort by title
                        return a.checklist.title.localeCompare(b.checklist.title);
                      }
                      return a.checklist.typed ? -1 : 1;
                    })
                    .map((checklist, index) => {
                      return (
                        <Row key={`Row-${checklist.id}-${index}-After`}>
                          <Col lg={8} key={`Col-${checklist.id}-${index}-${checklist.checklist.title}-After`}>
                            <span className="">{checklist.checklist.title}</span>
                          </Col>
                          <Col lg={4}>
                            <span className="thin-text">
                              {checklist.data.toLowerCase() === "passed" ? (
                                <Image className="pe-1" src={CheckPurple} />
                              ) : checklist.data.toLowerCase() === "failed" ? (
                                <Image className="pe-2" src={XRed} />
                              ) : (
                                checklist.data
                              )}
                            </span>
                          </Col>
                        </Row>
                      );
                    })}
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            {formData.id ? "Update" : "Create"}
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
