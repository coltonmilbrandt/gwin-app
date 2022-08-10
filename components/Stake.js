import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import React from "react"
// BE SURE to put "{ }" around abi
import { abi } from "../constants/TokenFarm_abi"
import { chainDict } from "../constants/chainDict"
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'
import Balances from '../components/Balances'

export default function Stake() {
    const { isWeb3Enabled, account, chainId: chainIdHex, Moralis } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const chainName = chainDict[chainId]

    const contractsInfo = require('../constants/contractInfo.json'); 

    const [userTotalValue, setUserTotalValue] = useState("")
    const [tokenValue, setTokenValue] = useState([])
    const [tokenFarm, setTokenFarm] = useState({
        address: '0x0000000000000000000000000000000000000000',
        abi: [0],
    })
    const [daiToken, setDaiToken] = useState({
        address: '0x0000000000000000000000000000000000000000',
        abi: [0],
        price_address: '0x0000000000000000000000000000000000000000',
    })
    const [gwinToken, setGwinToken] = useState({
        address: '0x0000000000000000000000000000000000000000',
        abi: [0],
    })
    const [wethToken, setWethToken] = useState({
        address: '0x0000000000000000000000000000000000000000',
        abi: [0],
        price_address: '0x0000000000000000000000000000000000000000',
    })
    const [token, setToken] = useState({
        address: '0x0000000000000000000000000000000000000000',
        abi: [0],
    })

    const [gwinWalletBalance, setGwinWalletBalance] = useState(0)
    const [wethWalletBalance, setWethWalletBalance] = useState(0)
    const [daiWalletBalance, setDaiWalletBalance] = useState(0)
    const [daiStakedBalance, setDaiStakedBalance] = useState(0)
    const [gwinStakedBalance, setGwinStakedBalance] = useState(0)
    const [wethStakedBalance, setWethStakedBalance] = useState(0)
    const [tokenAmount, setTokenAmount] = useState(0)

    const [count, setCount] = useState(0)
    const [isLoaded, setIsLoaded] = useState(0)

    const setContracts = () => {
        if(chainName) {
            console.log(chainName)
            setTokenFarm(contractsInfo[0]["networks"][chainName]["contracts"]["token_farm"])
            setDaiToken(contractsInfo[0]["networks"][chainName]["contracts"]["dai_token"])
            setGwinToken(contractsInfo[0]["networks"][chainName]["contracts"]["gwin_token"])
            setWethToken(contractsInfo[0]["networks"][chainName]["contracts"]["weth_token"])
        }
    }

    ///////////   Contract Functions   ////////////

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

    const { runContractFunction: stakeTokens
    } = useWeb3Contract({
        abi: tokenFarm.abi,
        contractAddress: tokenFarm.address,
        functionName: "stakeTokens",
        params: {
            _amount: Moralis.Units.ETH(tokenAmount),
            _token: token.address,
        },
    })

    ///////////   View Functions   ////////////
    
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
        runContractFunction: getBalanceOfGwinToken
    } = useWeb3Contract({
        abi: gwinToken.abi,
        contractAddress: gwinToken.address,
        functionName: "balanceOf",
        params: {
            account: account
        }
    })

    const { 
        runContractFunction: getBalanceOfWethToken
    } = useWeb3Contract({
        abi: wethToken.abi,
        contractAddress: wethToken.address,
        functionName: "balanceOf",
        params: {
            account: account
        }
    })

    const { 
        runContractFunction: getBalanceOfDaiToken
    } = useWeb3Contract({
        abi: daiToken.abi,
        contractAddress: daiToken.address,
        functionName: "balanceOf",
        params: {
            account: account
        }
    })

    const { 
        runContractFunction: getStakedDai
    } = useWeb3Contract({
        abi: tokenFarm.abi,
        contractAddress: tokenFarm.address,
        functionName: "getUserSingleTokenStakedValue",
        params: {
            _user: account,
            _token: daiToken.address,
        }
    })

    const { 
        runContractFunction: getStakedWeth
    } = useWeb3Contract({
        abi: tokenFarm.abi,
        contractAddress: tokenFarm.address,
        functionName: "getUserSingleTokenStakedValue",
        params: {
            _user: account,
            _token: wethToken.address,
        }
    })

    const { 
        runContractFunction: getStakedGwin
    } = useWeb3Contract({
        abi: tokenFarm.abi,
        contractAddress: tokenFarm.address,
        functionName: "getUserSingleTokenStakedValue",
        params: {
            _user: account,
            _token: gwinToken.address,
        }
    })

    ///////////   Toast Messsage Updates   ////////////

    const handleStakeSuccess = async (tx) => {
        await tx.wait(1)
        toast.success('Successfully Staked!')
        await updateUIValues()
        await getTokenBalances()
    }
    
    const handleStakeError = async (error) => {
        console.log(error)
        toast.error('Uh oh! Tx was approved but could not stake. Check console for error.')
    }

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        await stakeTokens({
            onSuccess: handleStakeSuccess,
            onError: (error) => handleStakeError(error, tx),
        })
    }

    const handleError = async (error) => {
        console.log(error)
        toast.error('Uh oh! Tx could not be approved. Check console for error.')
    }

    ///////////   Update UI   ////////////

    const updateUIValues = async (tokenVal) => {
        console.log("token test: ")
        console.log(tokenVal)
        if(tokenVal) {
            var tokenValue = tokenVal
            console.log("token: ")
            console.log(tokenValue)
            tokenValue = parseInt(tokenValue._hex)
            var tokenValue = tokenValue / Math.pow(10, 18)
            console.log(tokenValue)
            return tokenValue
        }
    }

    const getTokenBalances = async (tokenContract) => {
        const gwinTokenBalance = await getBalanceOfGwinToken()
        if(gwinTokenBalance){
            setGwinWalletBalance(await updateUIValues(gwinTokenBalance))
        }
        const wethTokenBalance = await getBalanceOfWethToken()
        if(wethTokenBalance){
            setWethWalletBalance(await updateUIValues(wethTokenBalance))
        }
        const daiTokenBalance = await getBalanceOfDaiToken()
        if(daiTokenBalance){
            setDaiWalletBalance(await updateUIValues(daiTokenBalance))
        }
        const stakedDaiBalance = await getStakedDai()
        if(stakedDaiBalance){
            setDaiStakedBalance(await updateUIValues(stakedDaiBalance))
        }
        const stakedGwinBalance = await getStakedGwin()
        if(stakedGwinBalance){
            setGwinStakedBalance(await updateUIValues(stakedGwinBalance))
        }
        const stakedWethBalance = await getStakedWeth()
        if(stakedWethBalance){
            setWethStakedBalance(await updateUIValues(stakedWethBalance))
        }
    }

    // This means that any time, any variable in here changes, run this function
    useEffect(() => {
        if(isWeb3Enabled){
            async function updateUI() {
                try {
                    setCount(count++)
                    console.log("count: " + count)
                    await setContracts()
                    await getTokenBalances()
                    setIsLoaded(isLoaded++)
                } catch (err) {
                    console.error(err)
                }
            }
            if (isWeb3Enabled) {
                updateUI()
            }
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        if(gwinToken.address != '0x0000000000000000000000000000000000000000'){
            async function updateBalances() {
                try {
                    setTimeout(async function(){
                        await getTokenBalances()
                    }, 2000)
                } catch (err) {
                    console.error(err)
                }
            }
            if(gwinToken.address != '0x0000000000000000000000000000000000000000'){
                updateBalances()
            }
        }
    }, [isWeb3Enabled, chainName, chainId, gwinToken])


    return (
        <div>
            <Toaster />
            <div className="grid grid-cols-1 md:grid-cols-3 text-gray-900 pb-4">
                <div>
                    <div className="bg-sky-50 m-3 shadow-md p-4 rounded-sm text-gray-700">
                        <div class="justify-center flex">
                            <Image src="/../public/eth.png" class="bg-white rounded-full" width='100px' height='100px' alt="/" />
                        </div>
                        <div class="whitespace-nowrap overflow-hidden text-ellipsis">
                            WETH - {wethToken.address}
                        </div>
                        <form>
                            <div class="flex justify-center">
                                <div class="mb-3 xl:w-96">
                                    <input
                                    type="number"
                                    max={wethWalletBalance}
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
                                            onError: (error) => handleError(error),
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
                    <Balances 
                        name = "WETH"
                        wallet = {wethWalletBalance}
                        staked = {wethStakedBalance}
                        price = "price"
                        tokenPic = "/../public/eth.png"
                    />
                </div>

                <div>
                    <div className="bg-sky-50 m-3 shadow-md p-4 rounded-sm text-gray-700">
                        <div class="justify-center flex">
                            <Image src="/../public/gwin-rect.webp" class="bg-white rounded-full" width='100px' height='100px' alt="/" />
                        </div>
                        <div class="whitespace-nowrap overflow-hidden text-ellipsis">
                            GWIN - {gwinToken.address}
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
                                            onError: (error) => handleError(error),
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
                    <Balances 
                        name = "GWIN"
                        wallet = {gwinWalletBalance}
                        staked = {gwinStakedBalance}
                        price = "price"
                        tokenPic = "/../public/gwin-rect.webp"
                    />
                </div>
                
                <div>
                    <div className="bg-sky-50 m-3 shadow-md p-4 rounded-sm text-gray-700">
                        <div class="justify-center flex">
                            <Image src="/../public/dai.png" class="bg-white rounded-full" width='100px' height='100px' alt="/" />
                        </div>
                        <div class="whitespace-nowrap overflow-hidden text-ellipsis">
                            DAI - {daiToken.address}
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
                                            onError: (error) => handleError(error),
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
                    <Balances 
                        name = "DAI"
                        wallet = {daiWalletBalance}
                        staked = {daiStakedBalance}
                        price = "price"
                        tokenPic = "/../public/dai.png"
                    />
                </div>
            </div>

            <div class="text-gray-700">
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