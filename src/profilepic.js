import React from "react";

export default function({ image, first_name, last_name, onClick }) {
    return (
        <div>
            <img
                src={image}
                alt={`${first_name} ${last_name}`}
                onClick={onClick}
            />
        </div>
    );
}
