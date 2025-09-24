"use client"
import Form from 'next/form'
import {Input} from '@/components/ui/input'
import React, { useState ,useActionState} from 'react'
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { FiSend } from "react-icons/fi";
import { formSchema } from '@/lib/validation';
import z from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/actions';
import { Any } from 'next-sanity';

const Formcreate = () =>
{
    const [errors, setErrors] = useState<Record<string,string>>({});
    const [pitch, setPitch] = useState("");
    const router = useRouter();
    const handleFormSubmit = async  (prevState: Any, formData: FormData) =>
    {
        try
        {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch: pitch
            };
             console.log("✅ Form values before validation:", formValues);
            await formSchema.parseAsync(formValues);
 console.log("✅ Validation passed");
            const result = await createPitch(prevState, formData, pitch);
            console.log("✅ Result from createPitch:", result);
    
            if (result.status === "SUCCESS")
            {
                toast.error("success");
        router.push(`/startup/${result._id}`) ;
      }
      return result;
        } catch (error){
            if (error instanceof z.ZodError)
        {
                const fieldError = error.flatten().fieldErrors;

                setErrors(fieldError as unknown as Record<string, string>);
                toast.error(" please check your input and try again❌");
                return {...prevState , error:'validation vaild',status:"ERROR"}
            }
            toast.error(`Unexpected error: ${JSON.stringify(error)}`);
            return {
                ...prevState,
                error: 'an unexpected error has occured',
                state:'ERROR'
        }
        } finally
        {
        }
    }
    const [state, formAction, isPending] = useActionState(
    handleFormSubmit,
    { error: "", status: "INITIAL" }
);

    
  return (
      <>
          <Form action={formAction} className=' max-w-3xl mx-auto px-2 md:px-0 '>
              <div className='mt-5'>
                  <label htmlFor="title" className='uppercase text-lg font-bold py-1'>Title</label>
                  <Input
                      id="title"
                      name="title"
                      placeholder="startup-title"
                      className="rounded-3xl border-2 border-black my-2 "
                  />
                  {errors.title && <p>{ errors.title}</p>}
              </div>
              <div className='mt-5'>
                  <label htmlFor="description" className='uppercase text-lg font-bold py-1'>Description</label>
                  <Textarea
                      id="description"
                      name="description"
                      placeholder="startup-description"
                      className="rounded-3xl border-2 border-black my-2 "
                  />
                  {errors.description && <p>{ errors.description}</p>}
              </div>
              <div className='mt-5'>
                  <label htmlFor="category" className='uppercase text-lg font-bold py-1'>category</label>
                  <Input
                      id="category"
                      name="category"
                      placeholder="startup-title"
                      className="rounded-3xl border-2 border-black my-2 "
                  />
                  {errors.category && <p>{ errors.category}</p>}
              </div>
               <div className='mt-5'>
                  <label htmlFor="link" className='uppercase text-lg font-bold py-1'>image url</label>
                  <Input
                      id="link"
                      name="link"
                      placeholder="startup-link"
                      className="rounded-3xl border-2 border-black my-2 "
                  />
                  {errors.link && <p>{ errors.link}</p>}
              </div>
              <div className='mt-5'>
                  <label htmlFor="pitch" className='uppercase text-lg font-bold py-1'>Pitch</label>
                  <MDEditor
                      value={pitch}
                      onChange={(value) => { setPitch(value as string) }}
                      height={300}
                      id="pitch"
                      
                      preview='edit'
                      style={{borderRadius:20, overflow:'hidden'}}
                      textareaProps={{placeholder:"decripe your idea"}}
                  />
                  {errors && <p>{ errors.title}</p>}
              </div>
              <div className='flex justify-center'>
                   <button
                  type="submit"
                  className='flex text-white  px-30 md:px- py-3 my-5 rounded-full bg-primary-500'
                  disabled={isPending}
              >
                      {isPending ? 'submiting' : 'submit your pitch'}
                      <FiSend  className='size-6  ml-2'/>
              </button>
             </div>
             
          </Form>
      </>
  )
}

export default Formcreate