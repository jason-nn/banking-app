import React from "react";

export default function SettingsSelect({ client }) {
    return (
        <>
            <option value={client.username}>{client.username}</option>
        </>
    );
}
