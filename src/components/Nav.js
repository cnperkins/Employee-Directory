import React from "react";

export default function Nav(props) {
    return (
        <nav className="bg-primary text-center pt-2 ">
            <div><h2>Employee Directory</h2></div>
            <div>
                <form>
                    <input
                        type="search"
                        placeholder="Search Name"
                        aria-label="Search"
                        name="search"
                        onChange={props.handleInputChange}
                        value={props.search}
                    />
                </form>
            </div>
        </nav>
    );
}