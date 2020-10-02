import React from "react";

export default function Navbar(props) {
    return (
        <nav className="bg-primary text-center pt-2 ">
            <div className="h1">Employee Directory</div>
            <div>
                <form className="">
                    <input
                        className="input rounded m-4"
                        type="search"
                        placeholder="Search by Employee"
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