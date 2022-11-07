import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button, Modal, Spinner } from "react-bootstrap";

function ChallanTableV2(props) {
  const {
    details,
    billingAddress,
    shippingAddress,
    carton,
    packet,
    fab,
    allowed,
    notAllowed,
  } = props;

  // print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Modal
      show={props.showModal}
      size="xl"
      onHide={() => props.setShowModal(false)}
      centered
    >
      {props.loading ? (
        <div className="card py-5">
          <div className="container">
            <div className="row justify-content-center">
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hselectedIdden="true"
                />
                Loading...
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          <div
            className="pl-5"
            style={{
              position: "absolute",
              right: "44%",
              top: "50px",
              zIndex: "100",
            }}
          >
            <button className="btn btn-warning" onClick={handlePrint}>
              <i className="fas fa-print"></i> Print This Page
            </button>
          </div>
          <div
            className="card-body card_box_bg white-bg-img-chala pb-4 chalan-table p-0"
            ref={componentRef}
          >
            {details.length !== 0 ? (
              <>
                <div style={{ position: "relative" }}>
                  <div className="d-flex justify-content-between">
                    <div className="ml-4">
                      <img
                        src="/media/logos/apsis-logo.png"
                        className="img-fluid"
                        alt="logo"
                        style={{ height: "100px" }}
                      />
                      <h3 className="card-title"> নিরাপদ ও স্বাস্থ্যসম্মত </h3>
                    </div>
                    <div
                      style={{ position: "absolute", top: "0px", right: "0px" }}
                    >
                      <div className="bg_shap_right">
                        <img
                          src="/media/bg/challan_shap_bg.png"
                          alt="bg-shap"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <div className="mt-3">
                    <h1 className="text-center">CHALAN</h1>
                    <h5 className="text-center">({details.order_type})</h5>
                  </div>
                </div>

                <h6 className="text-center mt-1">
                  110, Love Road, Tejgaon Industrial Area, Dhaka-1208
                </h6>

                <div className="grid mt-3">
                  <h6>
                    <strong>Name :</strong>
                  </h6>
                  <h6 className="chalan-value">{details.customerData.name}</h6>
                </div>
                <div className="grid">
                  <h6>
                    <strong>Billing Address :</strong>
                  </h6>
                  <h6 className="chalan-value">
                    House No: {billingAddress.house_no}, Road No:{" "}
                    {billingAddress.road_no}, {billingAddress.area},{" "}
                    {billingAddress.city} - {billingAddress.postcode}
                  </h6>
                </div>
                <div className="grid">
                  <h6>
                    <strong>Shipping Address :</strong>
                  </h6>
                  <h6 className="chalan-value">
                    House No: {shippingAddress.house_no}, Road No:{" "}
                    {shippingAddress.road_no}, {shippingAddress.area},{" "}
                    {shippingAddress.city} - {shippingAddress.postcode}
                  </h6>
                </div>
                <div className="grid">
                  <h6>
                    <strong>Phone :</strong>
                  </h6>
                  <h6 className="chalan-value">{details.customerData.phone}</h6>
                </div>

                <div className="row px-3">
                  {details.productData && details.productData.length ? (
                    <div className="col-12">
                      <div
                        className="table-responsive-sm mt-4"
                        style={{ padding: "0 20px" }}
                      >
                        <h6>Products</h6>
                        <table className="table table-bordered">
                          <tbody>
                            <tr className="cart_thead text-center">
                              <th scope="col">Code</th>
                              <th scope="col">Name</th>
                              <th scope="col">Category</th>
                              <th scope="col">Quantity</th>
                            </tr>
                            {details.productData.map((product, index) => (
                              <tr
                                className="order_item_list text-center"
                                key={index}
                              >
                                <td>{product.product_code}</td>
                                <td> {product.product_name} </td>
                                <td>{product.product_category_name}</td>
                                <td>{product.quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {details.cattleData && details.cattleData.length ? (
                    <div className="col-12">
                      <div
                        className="table-responsive-sm mt-4"
                        style={{ padding: "0 20px" }}
                      >
                        <h6>Catte</h6>
                        <table className="table table-bordered">
                          <tbody>
                            <tr className="cart_thead text-center">
                              <th scope="col">ID</th>
                              <th scope="col">Type</th>
                              <th scope="col">Breed</th>
                              <th scope="col">Color</th>
                              <th scope="col">Sex</th>
                              <th scope="col">Weight</th>
                            </tr>
                            {details.cattleData.map((product, index) => (
                              <tr
                                className="order_item_list text-center"
                                key={index}
                              >
                                <td>{product.cattle_id}</td>
                                <td> {product.cattle_type} </td>
                                <td>{product.breed}</td>
                                <td>{product.color}</td>
                                <td>{product.sex}</td>
                                <td>{product.weight} KG</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {fab.length ? (
                    <div className="col-12">
                      <div
                        className="table-responsive-sm"
                        style={{ padding: "0 20px" }}
                      >
                        <h6>Fabrication Model</h6>
                        <table className="table table-bordered">
                          <tbody>
                            <tr className="cart_thead text-center">
                              <th scope="col">Name</th>
                              <th scope="col">Details</th>
                              <th scope="col">Type</th>
                              <th scope="col">Weight</th>
                            </tr>
                            {fab.map((product, index) => (
                              <tr
                                className="order_item_list text-center"
                                key={index}
                              >
                                <td>{product.name}</td>
                                <td>{product.details}</td>
                                <td>{product.type}</td>
                                <td>{product.weight_after_process}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {packet.length ? (
                    <div className="col-6">
                      <div
                        className="table-responsive-sm"
                        style={{ padding: "0 20px" }}
                      >
                        <h6>Packet</h6>
                        <table className="table table-bordered">
                          <tbody>
                            <tr className="cart_thead text-center">
                              <th scope="col">Name</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Price</th>
                            </tr>
                            {packet.map((product, index) => (
                              <tr
                                className="order_item_list text-center"
                                key={index}
                              >
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>
                                  {product.cost_per_unit *
                                    (product.quantity_after_process === null
                                      ? product.quantity
                                      : product.quantity_after_process)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {carton.length ? (
                    <div className="col-6">
                      <div
                        className="table-responsive-sm"
                        style={{ padding: "0 20px" }}
                      >
                        <h6>Carton</h6>
                        <table className="table table-bordered">
                          <tbody>
                            <tr className="cart_thead text-center">
                              <th scope="col">Size</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Price</th>
                            </tr>
                            {carton.map((product, index) => (
                              <tr
                                className="order_item_list text-center"
                                key={index}
                              >
                                <td>{product.size}</td>
                                <td>{product.quantity}</td>
                                <td>
                                  {product.cost_per_unit *
                                    (product.quantity_after_process === null
                                      ? product.quantity
                                      : product.quantity_after_process)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {allowed.length ? (
                    <div className="col-6">
                      <div
                        className="table-responsive-sm"
                        style={{ padding: "0 20px" }}
                      >
                        <h6>Allowable Items</h6>
                        <table className="table table-bordered">
                          <tbody>
                            <tr className="cart_thead text-center">
                              <th scope="col">Name</th>
                              <th scope="col">Weight</th>
                            </tr>
                            {allowed.map((product, index) => (
                              <tr
                                className="order_item_list text-center"
                                key={index}
                              >
                                <td>{product.name}</td>
                                <td>{product.weight_after_process}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {notAllowed.length ? (
                    <div className="col-6">
                      <div
                        className="table-responsive-sm"
                        style={{ padding: "0 20px" }}
                      >
                        <h6>Not Allowable Items</h6>
                        <table className="table table-bordered">
                          <tbody>
                            <tr className="cart_thead text-center">
                              <th scope="col">Name</th>
                              <th scope="col">Weight</th>
                            </tr>
                            {notAllowed.map((product, index) => (
                              <tr
                                className="order_item_list text-center"
                                key={index}
                              >
                                <td>{product.name}</td>
                                <td>{product.weight_after_process}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {details.wsData.wastage_info ? (
                    <div className="col-12">
                      <div
                        className="table-responsive-sm"
                        style={{ padding: "0 20px" }}
                      >
                        <h6>Wastage Info</h6>
                        <table className="table table-bordered">
                          <tbody>
                            <tr className="cart_thead text-center">
                              <th scope="col">Items</th>
                              <th scope="col">Weight(KG)</th>
                            </tr>

                            <tr className="order_item_list text-center">
                              <td>{details.wsData.wastage_info}</td>
                              <td>{details.wsData.wastage_total}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="row justify-content-end px-5 mx-5">
                  <div className="col-4">
                    <div className="order-details-border mt-3">
                      <div
                        className="clearfix mb-2"
                        style={{ borderBottom: "1px solid #cfcfcf" }}
                      >
                        <h6 className="float-left text-dark">Order Summary</h6>
                        <h6 className="float-right">Price</h6>
                      </div>
                      <div className="gird">
                        <div>Product Price</div>
                        <div className="text-right">
                          ৳ {details.grand_total.toLocaleString()}
                        </div>
                      </div>

                      {details.wsData.fabtication_cost > 0 && (
                        <div className="gird">
                          <div>Fabrication</div>
                          <div className="text-right">
                            ৳ {details.wsData.fabtication_cost.toLocaleString()}
                          </div>
                        </div>
                      )}

                      {details.wsData.packet_price > 0 && (
                        <div className="gird">
                          <div>Packaging</div>
                          <div className="text-right">
                            ৳ {details.wsData.packet_price.toLocaleString()}
                          </div>
                        </div>
                      )}

                      {details.wsData.carton_price > 0 && (
                        <div className="gird">
                          <div>Carton</div>
                          <div className="text-right">
                            ৳ {details.wsData.carton_price.toLocaleString()}
                          </div>
                        </div>
                      )}

                      {details.wsData.shipping_fee > 0 && (
                        <div className="gird">
                          <div>Shipping Fee</div>
                          <div className="text-right">
                            ৳ {details.wsData.shipping_fee.toLocaleString()}
                          </div>
                        </div>
                      )}

                      {details.wsData.holding_cost_total > 0 && (
                        <div className="gird">
                          <div>Holding Cost</div>
                          <div className="text-right">
                            ৳{" "}
                            {details.wsData.holding_cost_total.toLocaleString()}
                          </div>
                        </div>
                      )}

                      <div className="gird">
                        <div>
                          <h6>Sub Total</h6>
                        </div>
                        <div className="text-right">
                          ৳ {details.wsData.order_subtotal.toLocaleString()}
                        </div>
                      </div>

                      {details.wsData.wastage_total > 0 && (
                        <div className="gird">
                          <div>Not Allowable</div>
                          <div className="text-right">
                            ৳ {details.wsData.wastage_total.toLocaleString()}
                          </div>
                        </div>
                      )}

                      {details.wsData.allowable_sale_items_total > 0 && (
                        <div className="gird">
                          <div>Allowable Sale</div>
                          <div className="text-right">
                            ৳{" "}
                            {details.wsData.allowable_sale_items_total.toLocaleString()}
                          </div>
                        </div>
                      )}

                      <div className="gird">
                        <div>Discount</div>
                        <div className="text-right">
                          ৳ {details.wsData.discount.toLocaleString()}
                        </div>
                      </div>
                      <div className="gird">
                        <div>
                          <h6>Total</h6>
                        </div>
                        <div className="text-right">
                          ৳ {details.wsData.order_total.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="signature">
                  <div>
                    <h6>Authorized Signature</h6>
                  </div>
                  <div>
                    <h6>Customer Signature</h6>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ChallanTable;
