"use client";
import Image from "next/image";
import { useState } from "react";
//var csv is the CSV file with headers
import Papa from "papaparse";
export default function Home() {
  const [data, setData] = useState<any>();
  console.log(data);

  return (
    <>
      <div
        className="
    w-[100vw] h-[100vh] flex justify-center items-center
    flex-col
    "
      >
        <div className=" h-[80%] w-[75%] rounded-2xl p-4">
          <label
            htmlFor="dropzone-file"
            className=" flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">CSV</p>
            </div>
            <input
              onChange={(e: any) => {
                const files = e.target.files;
                console.log(files);
                if (files) {
                  console.log(files[0]);
                  Papa.parse(files[0], {
                    complete: function (results) {
                      let key: any = results.data[0];
                      let data: any[] = results.data.slice(
                        1,
                        results.data.length - 1
                      );
                      let jsons: any[] = [];

                      for (let i of data) {
                        let jj: any = {};
                        for (let k = 0; k < i.length; k++) {
                          jj[key[k]] = i[k];
                        }
                        jsons.push(jj);
                      }
                      setData(jsons);
                    },
                  });
                }
              }}
              id="dropzone-file"
              type="file"
              accept=".csv"
              className="hidden"
            />
          </label>
        </div>

        {data && (
          <table>
            {
              <tr>
                {Object.keys(data[0]).map((vs) => (
                  <th>{vs}</th>
                ))}
                <th>add</th>
              </tr>
            }

            {data.map((v: any, i: any) => {
              return (
                <tr>
                  {Object.keys(v).map((vs) => (
                    <td>{v[vs]}</td>
                  ))}
                  <td>
                    <a
                      href={`http://www.google.com/calendar/render?
action=TEMPLATE
&text=${v["activity "]}
&dates=[start-custom format='${new Date(
                        v.Date
                      )}']/[end-custom format='${new Date(v.Date)}']
`}
                      target="_blank"
                      rel="nofollow"
                    >
                      Add to my calendar
                    </a>
                  </td>
                </tr>
              );
            })}
          </table>
        )}
      </div>
    </>
  );
}
