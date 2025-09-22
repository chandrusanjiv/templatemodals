import React from "react";
import "./styles.scss";
import dayjs from 'dayjs';

const MKTDI0500 = (props) => {
    const { FormatAmountAsINR = () => { }, termsOption, productData = [1, 2], selectedList, header } = props;

    const numberToAlphabet = (num) => {
        return String.fromCharCode(65 + num - 1);
    };

    return (
        <div style={{ border: "1px solid #000" }}>
            <div className='printTablePdf quotation-container' style={{ padding: "5px" }}>
                <div style={{ width: "100%" }}>
                    {header}
                </div>
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 20px" }}>
                        <div></div>
                        <div><h3 style={{ margin: 0, padding: 0 }}>Quotation</h3></div>
                        <div style={{ fontSize: "10px" }}>{selectedList?.documentDetail?.documentRefNo} | <b>Rev : </b> {selectedList?.documentDetail?.documentRevNo} | {selectedList?.documentDetail?.documentRevDate ? dayjs(selectedList?.documentDetail?.documentRevDate).format("DD-MM-YYYY") : ""}</div>
                    </div>
                    <div className='quotation-header' style={{ display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
                        <div style={{ color: '#000', fontSize: '14px', lineHeight: "17px" }}>
                            <h4 style={{ margin: 0, padding: 0, fontSize: '14px' }}>To</h4>
                            <p>{selectedList?.customer?.customerName},</p>
                            <p style={{ whiteSpace: "pre-line" }}>{selectedList?.customer?.address}</p>
                            <p>{selectedList?.customer?.city}- {selectedList?.customer?.pinCode}</p>
                            <p>{selectedList?.customer?.gstNumber}</p>
                        </div>
                        <div style={{ padding: '10px', lineHeight: "15px" }}>
                            {selectedList?.quotationNo && <p style={{ color: '#000', fontSize: '14px' }}><span style={{ fontWeight: "bold" }}>Quotation No</span>: {selectedList?.quotationNo}</p>}
                            <p style={{ color: '#000', fontSize: '14px' }}><span style={{ fontWeight: "bold" }}>Quotation Date</span>: {dayjs(selectedList?.quotationDate).format("DD-MM-YYYY")}</p>
                            {selectedList?.quotationPriorHistory && selectedList?.quotationPriorHistory?.length > 0 && <p style={{ color: "#000", fontSize: '14px' }}><span style={{ fontWeight: "bold" }}>Revision No</span>:  {numberToAlphabet(selectedList?.quotationPriorHistory?.length)}</p>}
                            <div style={{ width: "60%", padding: "3px 0" }}><hr></hr></div>
                            <h4>Contact Person Details:</h4>
                            <p>{selectedList?.contactPersonName}</p>
                            <p>{selectedList?.contactPersonMobileNo}</p>
                            <p>{selectedList?.contactPersonEmailId}</p>
                        </div>
                    </div>
                    <div className='product-description-block'>
                        <div style={{ padding: '10px' }}>
                            <h4 style={{ margin: 0, padding: 0, fontSize: '14px' }}>Product Description</h4>
                            <p style={{ color: '#000', fontSize: '12px', whiteSpace: "pre-line" }}>{selectedList?.productDescription ? selectedList?.productDescription : "--"}</p>
                        </div>
                        {
                            selectedList?.isComponent ? <div >
                                <div style={{ display: "flex", width: "100%", padding: "0px 10px", textAlign: "center" }}>
                                    {
                                        productData[0]?.components?.map((material) => {
                                            return <div style={{ border: "1px solid #000", width: "100%" }}>
                                                <p><b>{material?.familyName}</b> - {material?.componentName}</p>
                                            </div>
                                        })
                                    }
                                </div>
                            </div> : ""
                        }
                    </div>
                    <div className='product-table-container'>
                        <div style={{ padding: '10px' }}>
                            <table className='qoutation-preview-table' style={{ border: "1px solid #000", width: "100%", fontSize: "12px", pageBreakInside: "auto" }}>
                                <thead>
                                    <tr style={{ textAlign: "center", border: "1px solid #000", fontSize: "12px", backgroundColor: "#1d1d41", color: "#fff" }}>
                                        <th style={{ textAlign: "center", width: "30px" }}>S.No</th>
                                        <th style={{ textAlign: "center" }}>Product</th>
                                        {!selectedList?.isComponent && <th style={{ textAlign: "center", width: "100px" }}>Material/Thickness/Finish</th>}
                                        {
                                            productData?.some((details) => {
                                                return details?.productSpecifications?.some((spec) => spec?.value !== "")
                                            }) && <th style={{ textAlign: "center", width: "200px" }}>Description</th>
                                        }
                                        <th style={{ textAlign: "center", width: "45px" }}>Rate per</th>
                                        <th style={{ textAlign: "center", width: "45px" }}>Qty</th>
                                        <th style={{ textAlign: "center", width: "45px" }}>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productData && productData?.map((product, index) => {
                                            return (
                                                <tr key={index} className="details-row" style={{ textAlign: "center" }}>
                                                    <td style={{ textAlign: "center", width: "50px" }}>{index + 1}</td>
                                                    <td style={{ width: "200px" }}>
                                                        <div>
                                                            <p style={{ fontWeight: "bold" }}>{product?.productName}</p>
                                                            <p style={{ fontSize: "12px", whiteSpace: "pre-line", lineHeight: "16px" }}>{product?.description}</p>
                                                        </div>
                                                    </td>
                                                    {!selectedList?.isComponent && <td style={{ height: "100%" }}>
                                                        {product?.components?.map((material1, idx) => {
                                                            const isFirst = idx === 0;
                                                            const isLast = idx === product.components.length - 1;
                                                            return (
                                                                <div
                                                                    key={idx}
                                                                    style={{
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                        alignItems: "center",
                                                                        borderTop: isFirst ? "none" : "1px solid #000",
                                                                        borderBottom: isLast ? "none" : "1px solid #000",
                                                                        padding: "1px 0",
                                                                    }}
                                                                >
                                                                    <p
                                                                        style={{
                                                                            margin: 0,
                                                                            flex: 1,
                                                                            textAlign: "center",
                                                                            width: "50%",
                                                                            wordWrap: "break-word",
                                                                            overflowWrap: "break-word",
                                                                        }}
                                                                    >
                                                                        {material1?.familyName || "-"}
                                                                    </p>
                                                                    <p
                                                                        style={{
                                                                            margin: 0,
                                                                            flex: 1,
                                                                            textAlign: "center",
                                                                            borderLeft: "1px solid #000",
                                                                            paddingLeft: "8px",
                                                                            width: "50%",
                                                                            wordWrap: "break-word",
                                                                            overflowWrap: "break-word",
                                                                        }}
                                                                    >
                                                                        {material1?.componentName || "-"}
                                                                    </p>
                                                                </div>
                                                            );
                                                        })}
                                                    </td>
                                                    }
                                                    {
                                                        productData?.some((details) => {
                                                            return details?.productSpecifications?.some((spec) => spec?.value !== "")
                                                        }) &&
                                                        <td>
                                                            {product?.productSpecifications?.every((spec) => spec?.value === "") ? (
                                                                <p style={{ textAlign: "center" }}>__</p>
                                                            ) : (
                                                                product?.productSpecifications
                                                                    ?.filter((spec1) => spec1?.name && spec1?.value)
                                                                    ?.map((spec1, index, arr) => {
                                                                        const isFirst = index === 0;
                                                                        const isLast = index === arr?.length - 1;

                                                                        return (
                                                                            <div
                                                                                key={index}
                                                                                style={{
                                                                                    display: "flex",
                                                                                    justifyContent: "space-between",
                                                                                    alignItems: "center",
                                                                                    borderTop: isFirst ? "none" : "1px solid #000",
                                                                                    borderBottom: isLast ? "none" : "1px solid #000",
                                                                                    padding: "1px 0",
                                                                                }}
                                                                            >
                                                                                <p
                                                                                    style={{
                                                                                        margin: 0,
                                                                                        flex: 1,
                                                                                        textAlign: "center",
                                                                                        width: "50%",
                                                                                        wordWrap: "break-word",
                                                                                        overflowWrap: "break-word",
                                                                                    }}
                                                                                >
                                                                                    {spec1?.name || "-"}
                                                                                </p>
                                                                                <p
                                                                                    style={{
                                                                                        margin: 0,
                                                                                        flex: 1,
                                                                                        textAlign: "center",
                                                                                        borderLeft: "1px solid #000",
                                                                                        paddingLeft: "8px",
                                                                                        width: "50%",
                                                                                        wordWrap: "break-word",
                                                                                        overflowWrap: "break-word",
                                                                                    }}
                                                                                >
                                                                                    {spec1?.value || "-"}
                                                                                </p>
                                                                            </div>
                                                                        );
                                                                    })
                                                            )}
                                                        </td>}
                                                    <td style={{ textAlign: "center" }}>{FormatAmountAsINR(product?.rate)}</td>
                                                    <td style={{ textAlign: "center" }}>{product?.quantity} <p>{product?.uom}</p></td>
                                                    <td style={{ textAlign: "center" }}>{FormatAmountAsINR(product?.amount)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='quotation-footer'>
                        <div style={{ float: "right", padding: "10px" }}>
                            <div>
                                <h4 style={{ fontSize: '14px' }}>Total Amount : <span style={{ fontWeight: "normal" }}>  {FormatAmountAsINR(selectedList?.totalAmount)}</span></h4>
                            </div>
                        </div>
                        {!!termsOption && <div className='terms-block'>
                            <div style={{ margin: "5px", borderBottom: "2px dashed #cccc" }}>
                                <div>
                                    <h4 style={{ color: '#000', fontSize: '14px', margin: 0, padding: 0 }}>Terms & Conditions</h4>
                                    {
                                        termsOption?.forEach((term, index) => {
                                            if (term?.isCheck) {
                                                return <p key={`term-${index}`} style={{ color: '#000', fontSize: '12px', whiteSpace: "pre-line" }}>-{term?.changeTermValue?.includes("Others :") ? "-" : ""} {term?.changeTermValue?.split('<>' && 'Others :')}</p>
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>}
                        <div className='flexible' style={{ padding: "0 15px 30px" }}>
                            <div>
                                <h4 style={{ fontSize: '14px', margin: 0, padding: 0 }}>Prepared By :</h4>
                                <span>{selectedList?.preparedByName}</span>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '14px', margin: 0, padding: 0 }}>Approved By :</h4>
                                <span>{selectedList?.approvedByName}</span>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "80%", margin: "auto", paddingTop: "5px" }}>
                            <div>
                                <p>This Quotation is system-generated and does not require a manual signature.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MKTDI0500;