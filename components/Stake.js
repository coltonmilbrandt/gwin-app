import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import React from "react"
// BE SURE to put "{ }" around abi
import { abi } from "../constants/TokenFarm_abi"
import { MockDaiAbi } from "../constants/MockDai_abi"
import { ethers, utils } from "ethers"
import contractsJson from "../constants/contractInfo.json"
import { hex2a } from "../helpers/hexConverter"
import { chainDict } from "../constants/chainDict"

// I added ESLint Plugin to check react hooks

// TO DO
// - Create a helpful script to retrieve current chain !! DONE !!
// - Make all functions modulare=


export default function Stake() {
    const { isWeb3Enabled, account, chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const chainName = chainDict[chainId]
    console.log(chainName)

    const contractsInfo = require('../constants/contractInfo.json'); 
    console.log(contractsInfo);

    
    
    

    const [userTotalValue, setUserTotalValue] = useState("")
    const [tokenValue, setTokenValue] = useState([])
    const [tokenFarm, setTokenFarm] = useState({
        address: '0x0000000000000000000000000000000000000000',
        abi: [0],
    })
    const [daiToken, setDaiToken] = useState({
        address: '0x0000000000000000000000000000000000000000',
        abi: [0],
    })
    const [gwinToken, setGwinToken] = useState({
        address: '0x0000000000000000000000000000000000000000',
        abi: [0],
    })
    const [wethToken, setWethToken] = useState({
        address: '0x0000000000000000000000000000000000000000',
        abi: [0],
    })
    const [targetToken, setTargetToken] = useState({
        address: '0x0000000000000000000000000000000000000000',
        abi: [0],
    })

    const setContracts = () => {
        if(chainName) {
            console.log(chainName)
            setTokenFarm(contractsInfo[0]["networks"][chainName]["contracts"]["token_farm"])
            setDaiToken(contractsInfo[0]["networks"][chainName]["contracts"]["dai_token"])
            setGwinToken(contractsInfo[0]["networks"][chainName]["contracts"]["gwin_token"])
            setWethToken(contractsInfo[0]["networks"][chainName]["contracts"]["weth_token"])
            console.log("here we goo.....")
            console.log(tokenFarm)
        }
    }




    const { runContractFunction: approveDai } = useWeb3Contract({
        abi: daiToken.abi,
        contractAddress: daiToken.address,
        functionName: "approve",
        params: {spender: tokenFarm.address, amount: "1000000000000000000"},
    })

    const { runContractFunction: approveGwin } = useWeb3Contract({
        abi: gwinToken.abi,
        contractAddress: gwinToken.address,
        functionName: "approve",
        params: {spender: tokenFarm.address, amount: "1000000000000000000"},
    })
    
    const { runContractFunction: approveWeth } = useWeb3Contract({
        abi: wethToken.abi,
        contractAddress: wethToken.address,
        functionName: "approve",
        params: {spender: tokenFarm.address, amount: "1000000000000000000"},
    })
    

    const { runContractFunction: stakeDaiTokens } = useWeb3Contract({
        abi: tokenFarm.abi,
        contractAddress: tokenFarm.address,
        functionName: "stakeTokens",
        params: {
            _amount: "1000000000000000000",
            _token: daiToken.address,
        },
    })

    const { runContractFunction: stakeGwinTokens } = useWeb3Contract({
        abi: tokenFarm.abi,
        contractAddress: tokenFarm.address,
        functionName: "stakeTokens",
        params: {
            _amount: "1000000000000000000",
            _token: gwinToken.address,
        },
    })

    // View Functions //
    
    // getUserTotalValue()
    const { runContractFunction: getUserTotalValue
    } = useWeb3Contract({
        abi: abi,
        contractAddress: "0x48efFEBe8879A7024654dda2d90F1EF56b12f135",
        functionName: "getUserTotalValue",
        params: {
            _user: "0x3789F5efFb5022DEF4Fbc14d325e946c7B422eE3"
        },
    })
    
    // GetTokenValue()
    const { 
        runContractFunction: getTokenValue
    } = useWeb3Contract({
        abi: abi,
        contractAddress: "0x48efFEBe8879A7024654dda2d90F1EF56b12f135",
        functionName: "getTokenValue",
        params: {_token: "0xe1F284B9FB056cbF75A92c9b879594d1C74Fa7b9"},
    })

    


    // This means that any time, any variable in here changes, run this function
    useEffect(() => {
        if(isWeb3Enabled){
            async function updateUI() {
                try {
                    setContracts()
                    console.log("Running userTotalValue()...")
                    const userTotalValueFromCall = await getUserTotalValue()
                    console.log("User total value returned: " + userTotalValueFromCall)
                    var readableUserTotalValue = userTotalValueFromCall / Math.pow(10, 18)
                    setUserTotalValue(readableUserTotalValue)

                    console.log("Running getTokenValue()...")
                    const tokenValueFromCall = await getTokenValue()
                    console.log("Token value returned: " + tokenValueFromCall)
                    var readableValue = BigInt(tokenValueFromCall[0]).toString()
                    readableValue = readableValue / Math.pow(10, tokenValueFromCall[1])
                    console.log(tokenValue)
                    console.log(readableValue)
                    setTokenValue(readableValue)
                } catch (err) {
                    console.error(err)
                }
            }
            if (isWeb3Enabled) {
                updateUI()
            }
        }
    }, [isWeb3Enabled])

    return (
        <div>
            <div className="grid grid-cols-3 text-gray-900 pb-4">
                <div className="bg-[#4E5166] p-4 rounded-md text-gray-100">
                WETH 
                </div>
                <div className="bg-[#4E5166] p-4 rounded-md text-gray-100">
                GWIN
                </div>
                <div className="bg-[#4E5166] p-4 rounded-md text-gray-100">
                DAI
                    <>
                        <button 
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={async () => {
                                await approveDai()
                            }}
                        >Approve Token</button>
                    </>
                    <>
                        <button 
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={async () => {
                                await stakeDaiTokens()
                            }}
                        >Stake Token</button>
                    </>
                    <>
                        <button 
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={async () => {
                                await setContracts()
                                console.log(tokenFarm)
                                console.log(daiToken)
                                await setTargetToken(wethToken)
                                console.log(targetToken)
                                console.log(targetToken)
                            }}
                        >Test</button>
                    </>
                </div>
            </div>
            <div>
                <h4>
                    <>
                        You have ${userTotalValue} total staked
                        Each token is worth ${tokenValue} 
                    </>
                </h4>
            </div>
            
            
            
        </div>
    )
}