import React from "react";

export default function SettingsSelect({ client }) {
    return (
        <>
            <option value={client.accountNo}>
                {client.firstName} {client.lastName}
            </option>
        </>
    );
}
