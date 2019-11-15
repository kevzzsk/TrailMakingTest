import React, { Component } from 'react';
import { AppBar, Typography, Button, Toolbar, IconButton, Menu, MenuItem, Avatar } from '@material-ui/core';
import { Link, Redirect } from "react-router-dom";


/** Appbar of website */
class Appbar extends Component {

    /** @member */
    state = {
        anchorEl: null,
        accName: "R"
    }

    /**
     * @method
     * @param {Object} e Event DOM
     * @description set menu based on user click
     */
    handleMenu = (e) => {
        this.setState({
            anchorEl: e.currentTarget
        })
    }
    /**
     * @method
     * @description close menu on unfocus
     */
    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    }

    /**
     * @method
     * @description Call parent handleClose for logout
     */
    handleLogout = () => {
        this.props.logout()
        this.handleClose()
    }

    /**
     * @method
     * @description Route to the correct page when user click on "profile"
     */
    handleProfile = () => {
        let cache_data = localStorage.getItem("account")
        console.log(cache_data)
        if (cache_data !== undefined && cache_data !== null ) {
            if (JSON.parse(cache_data).accountType === 0) {
                this.props.history.push("/user-page")
            }else if (JSON.parse(cache_data).accountType === 1){
                this.props.history.push("/doctor-page")
            }
        }
        this.handleClose()

    }

    /**
     * @method
     * @description Display logout information when user is logged in successfully
     */
    renderLogout = () => {
        return <li>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
                className="p-1"
            >
                <Avatar>{this.state.accName}</Avatar>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
            >
                <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
                <MenuItem onClick={this.handleLogout}>Log out</MenuItem>
            </Menu>
        </li>
    }

    /**
     * @method
     * @description Display login information when user is logged out successfully
     */
    renderLogin = () => {
        return <li><Link to={'/login'}>
            Login
        </Link>
        </li>
    }

    render() {
        return (
            <nav className="appbar">
                <ul>
                    <li><Link to={'/'}>
                        Trail Making Test
                    </Link>
                    </li>

                </ul>

                <ul>
                    <li><Link to="/">About</Link></li>
                    <li><Link to={'/blog'}>Blog</Link></li>
                    <li><Link to="/">Contact</Link></li>
                    {this.props.isAuthenticated ? this.renderLogout() : this.renderLogin()}

                </ul>
            </nav>
        )
    }
}


export default Appbar;