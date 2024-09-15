'use client'; // This is required when using hooks like useSearchParams

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2Icon, DownloadIcon } from "lucide-react"
import { PaymentUrl } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { getInvoice, getSessionStripe } from '@/hooks/EndpointsPayment/stripe.service';


export default function SuccessPage() {
    const router = useRouter();
    const [session, setSession]: any = useState(null);
    const [pdfUrl, setPdfUrl]: any = useState(null);
    const [email, setEmail]: any = useState(null);
    const [amount, setAmount]: any = useState(null);

    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    console.log(sessionId);

    useEffect(() => {
        if (sessionId) {
            getSessionStripe(sessionId).then((data) => {
                console.log(data.session);
                setEmail(data.session.customer_email);
                setAmount(data.session.amount_total / 100);
                setSession(data.session);
            })

        }


    }, [sessionId]);



    const handleGetInvoice = () => {

        getInvoice(email, amount).then((data) => {
            console.log(data.invoiceLink);
            window.open(data.invoiceLink, '_blank');
        })

    }

    return (
        <div>
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CheckCircle2Icon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <CardTitle className="text-2xl font-bold text-green-700">Payment Successful!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-center text-gray-600">
                        Thank you for your purchase. Your transaction has been completed successfully.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Transaction Details:</h3>
                        <ul className="space-y-1 text-sm">
                            <li><span className="font-medium">Amount:</span> ${amount}</li>
                            <li><span className="font-medium">Date:</span> {new Date().toLocaleDateString()}</li>
                            <li><span className="font-medium">Transaction ID:</span> TRX123456789</li>
                        </ul>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={handleGetInvoice}
                        className="w-full"
                    >
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Get Invoice
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}