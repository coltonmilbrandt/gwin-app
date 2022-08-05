import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import React from "react"
// BE SURE to put "{ }" around abi
import { abi } from "../constants/TokenFarm_abi"
import { MockDaiAbi } from "../constants/MockDai_abi"
import { ethers, utils } from "ethers"
import contractsJson from "../constants/contractInfo.json"
import { hex2a } from "../helpers/hexConverter"
import { chainDict } from "../constants/chainDict"
import Image from 'next/image'

// I added ESLint Plugin to check react hooks

// TO DO
// - Create a helpful script to retrieve current chain !! DONE !!
// - Make all functions modulare
    // 1 - How do we do inputs?

export default function Stake() {
    const { isWeb3Enabled, account, chainId: chainIdHex, Moralis } = useMoralis()
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
    const [token, setToken] = useState({
        address: '0x0000000000000000000000000000000000000000',
        abi: [0],
    })

    const [wethReadable, setWethReadable] = useState()
    const [tokenAmount, setTokenAmount] = useState(0)
    const [wethBalance, setWethBalance] = useState("")

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


    const { 
        runContractFunction: approveToken,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: token.abi,
        contractAddress: token.address,
        functionName: "approve",
        params: {spender: tokenFarm.address, amount: Moralis.Units.ETH(tokenAmount)},
    })

    //1000000000000000000



    

    const { runContractFunction: stakeTokens } = useWeb3Contract({
        abi: tokenFarm.abi,
        contractAddress: tokenFarm.address,
        functionName: "stakeTokens",
        params: {
            _amount: Moralis.Units.ETH(tokenAmount),
            _token: token.address,
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

    // GetBalanceOfToken()
    const { 
        runContractFunction: getBalanceOfToken
    } = useWeb3Contract({
        abi: token.abi,
        contractAddress: token.address,
        functionName: "balanceOf",
        params: {
            account: account
        }
    })

    const handleNewNotification = (tx) => {
        console.log("Done!!")
        console.log(tx)
    }

    const handleStakeSuccess = async (tx) => {
        await tx.wait(1)
        
    }

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        // updateUIValues()
        handleNewNotification(tx)
        await stakeTokens({
            onSuccess: handleStakeSuccess,
            onError: (error) => console.log(error),
        })
    }
    

    // This means that any time, any variable in here changes, run this function
    useEffect(() => {
        if(isWeb3Enabled){
            async function updateUI() {
                try {
                    await setContracts()


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
            <div className="grid grid-cols-1 md:grid-cols-3 text-gray-900 pb-4">
                <div className="bg-sky-50 m-3 shadow-md p-4 rounded-sm text-gray-700">
                    <div class="justify-center flex">
                        <Image src="/../public/eth.png" class="bg-white rounded-full" width='100px' height='100px' alt="/" />
                    </div>
                    <div class="whitespace-nowrap overflow-hidden text-ellipsis">
                        WETH - {wethToken.address}
                    </div>
                    <div>
                        {Moralis.Units.ETH(tokenAmount)}
                    </div>
                    <div>
                        Balance: {wethBalance}
                    </div>
                    <form>
                        <div class="flex justify-center">
                            <div class="mb-3 xl:w-96">
                                <input
                                type="number"
                                class="
                                form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                id="wethInput"
                                placeholder="WETH to Stake"
                                onInput={e => {setToken(wethToken); if(e.target.value == ""){setTokenAmount(0)} else {setTokenAmount(e.target.value)} } }
                                onClick={e => {
                                    setToken(wethToken); if(e.target.value != ""){setTokenAmount(e.target.value)} else{setTokenAmount(0)}
                                }}
                                />
                            </div>
                        </div>
                        <>
                            <button 
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                disabled={token != wethToken || tokenAmount == 0 || isLoading || isFetching}
                                onClick={async () => {
                                    await approveToken({
                                        onSuccess: handleSuccess,
                                        onError: (error) => console.log(error),
                                    })
                                }}
                            >
                                {isLoading || isFetching ? (
                                    <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                                ) : (
                                    "Stake Token"
                                )}
                            </button>
                        </>
                    </form>
                </div>

                <div className="bg-sky-50 m-3 shadow-md p-4 rounded-sm text-gray-700">
                    <div class="justify-center flex">
                        <Image src="/../public/gwin-rect.webp" class="bg-white rounded-full" width='100px' height='100px' alt="/" />
                    </div>
                    <div class="whitespace-nowrap overflow-hidden text-ellipsis">
                        GWIN - {gwinToken.address}
                    </div>
                    <div>
                        {token.address}
                    </div>
                    <form>
                        <div class="flex justify-center">
                            <div class="mb-3 xl:w-96">
                                <input
                                required
                                type="number"
                                class="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                id="exampleNumber0"
                                placeholder="GWIN to Stake"
                                onInput={e => {setToken(gwinToken); if(e.target.value == ""){setTokenAmount("0")} else {setTokenAmount(e.target.value)} } }
                                onClick={e => {
                                    setToken(gwinToken); if(e.target.value != ""){setTokenAmount(e.target.value)} else{setTokenAmount(0)}
                                }}
                                />
                            </div>
                        </div>
                        <>
                            <button 
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                disabled={token != gwinToken || tokenAmount == 0 || isLoading || isFetching}
                                onClick={async () => {
                                    await approveToken({
                                        onSuccess: handleSuccess,
                                        onError: (error) => console.log(error),
                                    })
                                }}
                            >
                                {isLoading || isFetching ? (
                                    <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                                ) : (
                                    "Stake Token"
                                )}
                            </button>
                        </>
                    </form>
                </div>

                <div className="bg-sky-50 m-3 shadow-md p-4 rounded-sm text-gray-700">
                    <div class="justify-center flex">
                        <Image src="/../public/dai.png" class="bg-white rounded-full" width='100px' height='100px' alt="/" />
                    </div>
                    <div class="whitespace-nowrap overflow-hidden text-ellipsis">
                        DAI - {daiToken.address}
                    </div>
                    <div>
                        {tokenAmount}
                    </div>
                    <form>
                        <div class="flex justify-center">
                            <div class="mb-3 xl:w-96">
                                <input
                                required
                                type="number"
                                class="
                                form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                id="exampleNumber0"
                                placeholder="DAI to Stake"
                                onInput={e => {setToken(daiToken); if(e.target.value == ""){setTokenAmount(0)} else {setTokenAmount(e.target.value)} } }
                                onClick={e => {
                                    setToken(daiToken); if(e.target.value != ""){setTokenAmount(e.target.value)} else{setTokenAmount(0)}
                                }}
                                />
                            </div>
                        </div>
                        <>
                            <button 
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                disabled={token != daiToken || tokenAmount == 0 || isLoading || isFetching}
                                onClick={async () => {
                                    await approveToken({
                                        onSuccess: handleSuccess,
                                        onError: (error) => console.log(error),
                                    })
                                }}
                                >
                                    {isLoading || isFetching ? (
                                        <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                                    ) : (
                                        "Stake Token"
                                    )}
                                </button>
                        </>
                    </form>
                </div>
            </div>
            <div>
                <h4>
                    <>
                        You have ${userTotalValue} total staked
                        Each token is worth ${tokenValue} 
                    </>
                </h4>
                <h4>
                    <>
                        Target address: {token.address}
                    </>
                </h4>
            </div>
            
            
        </div>
    )
}