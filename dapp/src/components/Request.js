import { closeRequest, donate } from "@/services/Web3Service";
import { generateAvatarURL } from "@cfx-kit/wallet-avatar";

import Web3 from "web3";

export default function Request({ data }) {

    function btnCloseClick() {
        if (!confirm("Are you sure you want to close this order?")) return;

        closeRequest(data.id)
            .then(result => {
                alert("Order closed successfully. In a few minutes you will no longer be seen on the site.");
                window.location.reload();
            })
            .catch(err => {
                console.error(err);
                alert(err.message);
            })
    }

    function btnHelpClick() {
        const donationInBnb = prompt("How much do you want to donate (in ETH)?", 0);
        donate(data.id, donationInBnb)
            .then(result => {
                alert("Donation successful. It will be processed in a few minutes.");
                window.location.reload();
            })
            .catch(err => {
                console.error(err);
                alert(err.message);
            })
    }

    return (
        <>
            <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
                <img src={generateAvatarURL(data.author)} width="32" height="32" className="rounded-circle" />
                <div className="d-flex gap-2 w-100 justify-content-between">
                    <div className="w-100">
                        <div className="row">
                            <div className="col-10">
                                <h6 className="mb-0">{data.title} &rsaquo;&rsaquo; Contact: {data.contact}</h6>
                            </div>
                            <div className="col-2">
                                <div className="text-end">
                                    {
                                        localStorage.getItem("wallet") === data.author.toLowerCase()
                                            ? <button type="button" className="btn btn-danger btn-sm" onClick={btnCloseClick}>Close</button>
                                            : <button type="button" className="btn btn-success btn-sm" onClick={btnHelpClick}>&#36; Help</button>
                                    }
                                </div>
                            </div>
                        </div>
                        <p className="opacity-75 pe-5 mb-0 me-5">{data.description}</p>
                        <div className="row">
                            <div className="col">
                                <span className="me-1 opacity-75">Target:</span>
                                <span className="opacity-50">
                                    {
                                        data.balance
                                            ? `ETH ${Web3.utils.fromWei(data.balance, "ether")} obtained from ${Web3.utils.fromWei(data.goal, "ether")}`
                                            : `ETH ${Web3.utils.fromWei(data.goal, "ether")}`
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}