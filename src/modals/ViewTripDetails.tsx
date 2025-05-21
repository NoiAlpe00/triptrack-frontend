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
import { formatISOString, getLocalISOString, isDatePast } from "../utils/utilities";

export default function ViewTripDetails({ passedData, type }: ViewTripProps) {
  const [show, setShow] = useState(false);

  // const auth = useAuthUser();
  // const role = auth()?.role ?? "Requisitioner";

  const now = getLocalISOString(new Date());
  const isPast = isDatePast(passedData.tripStart, now);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {type == "pending" ? (
        <Button size="sm" className="w-100" onClick={handleShow}>
          <i className="bi bi-eye-fill" /> View
        </Button>
      ) : type == "title" ? (
        <Button variant="link" size="sm" className="w-100 text-start" onClick={handleShow}>
          {passedData.title}
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
                  {
                    <>
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
                      ) : passedData.requestStatus?.toLowerCase() == "endorsed" && isPast ? (
                        <>
                          <Row className="d-flex">
                            <Col className="px-1">
                              <i className="bi bi-file-earmark-arrow-up" />{" "}
                              <span className="text-primary">
                                <strong>Endorsed</strong>
                              </span>
                            </Col>
                          </Row>
                        </>
                      ) : isPast ? (
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
                      ) : (
                        "-"
                      )}
                    </>
                  }
                </Col>
                <Col lg={6} className="d-flex justify-content-center">
                  {(() => {
                    const requestStatus = passedData.requestStatus.toLowerCase();
                    const tripStatus = passedData.tripStatus?.toLowerCase();
                    const tripStart = passedData.tripStart.slice(0, -1); // remove trailing 'Z'
                    const isPast = !isDatePast(tripStart, now);

                    if (requestStatus === "declined") return "-";
                    if (requestStatus === "pending" && isPast) return "-";

                    if (isPast || requestStatus !== "declined") {
                      if (tripStatus === "upcoming") {
                        return (
                          <Row className="d-flex">
                            <Col className="px-1">
                              <Image className="pe-2" src={Upcoming} />
                              <span className="text-primary">
                                <strong>Upcoming</strong>
                              </span>
                            </Col>
                          </Row>
                        );
                      } else if (tripStatus === "ongoing") {
                        return (
                          <Row className="d-flex">
                            <Col className="px-1">
                              <Image className="pe-2" src={Ongoing} />
                              <span className="text-primary">
                                <strong>Ongoing</strong>
                              </span>
                            </Col>
                          </Row>
                        );
                      } else {
                        return (
                          <Row className="d-flex">
                            <Col className="px-1">
                              <Image className="pe-2" src={Past} />
                              <span className="text-secondary">
                                <strong>Past</strong>
                              </span>
                            </Col>
                          </Row>
                        );
                      }
                    }

                    return "-";
                  })()}
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

              {passedData.feedbacks && passedData.feedbacks.length > 0 && (
                <Row className="mt-3">
                  <Row>
                    <h5 className="text-primary thin-text">Feedback</h5>
                  </Row>
                  {passedData.feedbacks.map((feedback) => (
                    <div key={`feedback-div-block-${feedback.id}`}>
                      {passedData.vehicle && (
                        <Row key={`feedback-vehicle-row-${feedback.id}`}>
                          <Col key={`feedback-vehicle-col-1-${feedback.id}`} lg={3}>
                            <span className="">Vehicle Rating</span>
                          </Col>
                          <Col key={`feedback-vehicle-col-2-${feedback.id}`} lg={9}>
                            <span className="thick-text">{feedback.vehicleRating}</span>
                          </Col>
                        </Row>
                      )}
                      {passedData.driver && (
                        <Row key={`feedback-driver-row-${feedback.id}`}>
                          <Col key={`feedback-driver-col-1-${feedback.id}`} lg={3}>
                            <span className="">Driver Rating</span>
                          </Col>
                          <Col key={`feedback-driver-col-2-${feedback.id}`} lg={9}>
                            <span className="thick-text">{feedback.driverRating}</span>
                          </Col>
                        </Row>
                      )}
                      <Row key={`feedback-service-col-1-${feedback.id}`}>
                        <Col key={`feedback-service-col-1-${feedback.id}`} lg={3}>
                          <span className="">Service Rating</span>
                        </Col>
                        <Col key={`feedback-service-col-2-${feedback.id}`} lg={9}>
                          <span className="thick-text">{feedback.serviceRating}</span>
                        </Col>
                      </Row>
                      {feedback.remarks.length > 0 && (
                        <Row key={`feedback-remarks-col-1-${feedback.id}`}>
                          <Col key={`feedback-remarks-col-1-${feedback.id}`} lg={3}>
                            <span className="">Remarks</span>
                          </Col>
                          <Col key={`feedback-remarks-col-2-${feedback.id}`} lg={9}>
                            <span className="thick-text">{feedback.remarks}</span>
                          </Col>
                        </Row>
                      )}
                    </div>
                  ))}
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
                  <span className="thin-text">{passedData.timeDeparture ? formatISOString(passedData.timeDeparture.slice(0, -1)) : "No Data"}</span>
                </Col>
              </Row>
              <Row>
                <Col lg={3}>
                  <span className="">Time Arrival</span>
                </Col>
                <Col lg={9}>
                  <span className="thin-text">{passedData.timeArrival ? formatISOString(passedData.timeArrival.slice(0, -1)) : "No Data"}</span>
                </Col>
              </Row>
              <Row>
                <Col lg={6} className="mt-2">
                  <Row>
                    <h5 className="text-primary thin-text">Departure Checklist</h5>
                  </Row>
                  <Row>
                    <Col lg={3}>
                      <span className="thick-text">Guard</span>
                    </Col>
                    <Col lg={9}>
                      <span className="">
                        {passedData.tripChecklists.filter((check) => check.timing === "Before").length > 0
                          ? `${passedData.tripChecklists.filter((check) => check.timing === "Before")[0].guard.lastName}, ${
                              passedData.tripChecklists.filter((check) => check.timing === "Before")[0].guard.firstName
                            }`
                          : "-"}
                      </span>
                    </Col>
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
                  <Row>
                    <Col lg={3}>
                      <span className="thick-text">Guard</span>
                    </Col>
                    <Col lg={9}>
                      <span className="">
                        {passedData.tripChecklists.filter((check) => check.timing === "After").length > 0
                          ? `${passedData.tripChecklists.filter((check) => check.timing === "After")[0].guard.lastName}, ${
                              passedData.tripChecklists.filter((check) => check.timing === "After")[0].guard.firstName
                            }`
                          : "-"}
                      </span>
                    </Col>
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
