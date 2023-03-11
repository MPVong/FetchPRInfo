const axios = require('axios');
const express = require("express");
const router = express.Router();
const fs = require("fs");
const moment = require('moment');
const json2csv = require('json2csv').parse;
const path = require('path')

// @acess Public
router.post("/fetchPRInfo", async (req, res) => {

    const owner = process.env.OWNER;            //  Git username
    const state = process.env.STATE;                        // all | open | closed
    const per_page = process.env.PER_PAGE;      // default 30
    const base = process.env.BASE;     // branch name, for example feature/abcClassFilters, emptry string for whole branches
    let repo = "Web";                           // Git repo name
    let page = 1;
    let data = [];
    let isFetching = true;

    while (isFetching) {
        await axios({
            url: `https://api.github.com/repos/${owner}/${repo}/pulls?state=${state}&per_page=${per_page}&page=${page}${base ? "&base=" + base : ""}`,
            method: "GET",
            headers: {
                Accept: process.env.ACCEPT,
                Authorization: `Bearer ${process.env.TOKEN}`,
                "X-GitHub-Api-Version": process.env.X_GITHUB_API_VERSION,
            },
        })
            .then(async (resp) => {
                page++;
                if (resp.data && resp.data.length > 0) {
                    resp.data.map((pr) => {
                        data.push({
                            number: pr.number,
                            html_url: pr.html_url,
                            created_at: pr.created_at,
                            merged_at: pr.merged_at,
                            closed_at: pr.closed_at,
                            state: pr.state,
                            project: repo,
                        })
                    });
                }
                else isFetching = false;
                // console.log(`fetching from ${repo}... page: ${page}, fetched whole data length: ${data.length}`);
            }).catch((err) => {
            });
    }

    repo = "ReactNativeApp";
    page = 1;
    isFetching = true;

    while (isFetching) {
        await axios({
            url: `https://api.github.com/repos/${owner}/${repo}/pulls?state=${state}&per_page=${per_page}&page=${page}${base ? "&base=" + base : ""}`,
            method: "GET",
            headers: {
                Accept: process.env.ACCEPT,
                Authorization: `Bearer ${process.env.TOKEN}`,
                "X-GitHub-Api-Version": process.env.X_GITHUB_API_VERSION,
            },
        })
            .then((resp) => {
                page++;
                if (resp.data && resp.data.length > 0) {
                    resp.data.map((pr) => {
                        data.push({
                            number: pr.number,
                            html_url: pr.html_url,
                            created_at: pr.created_at,
                            merged_at: pr.merged_at,
                            closed_at: pr.closed_at,
                            state: pr.state,
                            project: repo,
                        })
                    });
                }
                else isFetching = false;
                // console.log(`fetching from ${repo}... page: ${page}, fetched whole data length: ${data.length}`);
            }).catch((err) => {
            });
    }

    return res.status(200).json({ prInfoList: data });
});

router.post("/download", async (req, res) => {

    const owner = process.env.OWNER;            //  Git username
    const state = process.env.STATE;                        // all | open | closed
    const per_page = process.env.PER_PAGE;      // default 30
    const base = process.env.BASE;     // branch name
    let repo = "Web";                           // Git repo name
    let page = 1;
    let data = [];
    let isFetching = true;

    while (isFetching) {
        await axios({
            url: `https://api.github.com/repos/${owner}/${repo}/pulls?state=${state}&per_page=${per_page}&page=${page}${base ? "&base=" + base : ""}`,
            method: "GET",
            headers: {
                Accept: process.env.ACCEPT,
                Authorization: `Bearer ${process.env.TOKEN}`,
                "X-GitHub-Api-Version": process.env.X_GITHUB_API_VERSION,
            },
        })
            .then(async (resp) => {
                page++;
                if (resp.data && resp.data.length > 0) {
                    resp.data.map((pr) => {
                        data.push({
                            number: pr.number,
                            html_url: pr.html_url,
                            created_at: pr.created_at,
                            merged_at: pr.merged_at,
                            closed_at: pr.closed_at,
                            state: pr.state,
                            project: repo,
                        })
                    });
                }
                else isFetching = false;
                // console.log(`fetching from ${repo}... page: ${page}, fetched whole data length: ${data.length}`);
            }).catch((err) => {
            });
    }

    repo = "ReactNativeApp";
    page = 1;
    isFetching = true;

    while (isFetching) {
        await axios({
            url: `https://api.github.com/repos/${owner}/${repo}/pulls?state=${state}&per_page=${per_page}&page=${page}${base ? "&base=" + base : ""}`,
            method: "GET",
            headers: {
                Accept: process.env.ACCEPT,
                Authorization: `Bearer ${process.env.TOKEN}`,
                "X-GitHub-Api-Version": process.env.X_GITHUB_API_VERSION,
            },
        })
            .then((resp) => {
                page++;
                if (resp.data && resp.data.length > 0) {
                    resp.data.map((pr) => {
                        data.push({
                            number: pr.number,
                            html_url: pr.html_url,
                            created_at: pr.created_at,
                            merged_at: pr.merged_at,
                            closed_at: pr.closed_at,
                            state: pr.state,
                            project: repo,
                        })
                    });
                }
                else isFetching = false;
                // console.log(`fetching from ${repo}... page: ${page}, fetched whole data length: ${data.length}`);
            }).catch((err) => {
            });
    }

    // const fields = Object.keys(req.body.data[0]);
    const fields = [
        {
            label: 'PR Number',
            value: 'number',
        },
        {
            label: 'Link',
            value: 'html_url',
        },
        {
            label: 'Created Date',
            value: 'created_at',
        },
        {
            label: 'Merged Date',
            value: 'merged_at',
        },
        {
            label: 'Closed Date',
            value: 'closed_at',
        },
        {
            label: 'State',
            value: 'state',
        },
        {
            label: 'Project',
            value: 'project',
        },
    ]

    try {
        csv = json2csv(data, { fields });
    } catch (err) {
        return res.status(500).json({ err });
    }
    const dateTime = moment().format('YYYYMMDDhhmmss');
    const filePath = path.join(__dirname, "../..", "client", "public", "PR-" + dateTime + ".csv")
    fs.writeFile(filePath, csv, function (err) {
        if (err) {
            console.log(err)
            return res.json(err).status(500);
        }
        else {
            setTimeout(function () {
                fs.unlink(filePath, function (err) { // delete this file after 30 seconds
                    if (err) {
                        console.error(err);
                    }
                    console.log('File has been Deleted');
                });

            }, 600000);
            res.download(filePath);
        }
    });
});


module.exports = router;