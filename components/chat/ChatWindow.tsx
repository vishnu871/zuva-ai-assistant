// "use client";

// import { useEffect, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { sendMessage } from "@/services/chat";

// import ChatHeader from "./ChatHeader";
// import ChatWelcome from "./ChatWelcome";
// import SuggestedPrompt from "./SuggestedPrompt";
// import ChatInput from "./ChatInput";
// import ChatMessage from "./ChatMessage";
// import TypingIndicator from "./TypingIndicator";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface Message {
//   id: number;
//   sender: "user" | "assistant";
//   text: string;
// }

// const GENERATING_MESSAGES = [
//   "Generating your insight",
//   "Connecting the relevant dots",
//   "Curating the details for you",
//   "Shaping a thoughtful response",
//   "Almost there — putting it all together",
// ];

// export default function ChatWindow({
//   isOpen,
//   onClose,
// }: Props) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);
//   const [generatingMessage, setGeneratingMessage] = useState(
//     GENERATING_MESSAGES[0]
//   );

//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   const suggestions = [
//     "🌿 Learn about our programs",
//     "📅 Upcoming workshops",
//     "✨ Which journey suits me?",
//     "💜 Tell me about Zuva Life",
//   ];

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages, typing, generatingMessage]);

//   useEffect(() => {
//     if (!typing) {
//       setGeneratingMessage(GENERATING_MESSAGES[0]);
//       return;
//     }

//     const timers = [
//       window.setTimeout(() => {
//         setGeneratingMessage(GENERATING_MESSAGES[1]);
//       }, 5000),

//       window.setTimeout(() => {
//         setGeneratingMessage(GENERATING_MESSAGES[2]);
//       }, 10000),

//       window.setTimeout(() => {
//         setGeneratingMessage(GENERATING_MESSAGES[3]);
//       }, 15000),

//       window.setTimeout(() => {
//         setGeneratingMessage(GENERATING_MESSAGES[4]);
//       }, 20000),
//     ];

//     return () => {
//       timers.forEach((timer) => window.clearTimeout(timer));
//     };
//   }, [typing]);

//   async function handleSendMessage(text?: string) {
//     const content = (text ?? input).trim();

//     if (!content || typing) return;

//     const userMessage: Message = {
//       id: Date.now(),
//       sender: "user",
//       text: content,
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setTyping(true);
//     setGeneratingMessage(GENERATING_MESSAGES[0]);

//     try {
//       const response = await sendMessage(content);

//       const aiMessage: Message = {
//         id: Date.now() + 1,
//         sender: "assistant",
//         text:
//           response.message ??
//           "Sorry, I couldn't generate a response.",
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       console.error(error);

//       const aiMessage: Message = {
//         id: Date.now() + 1,
//         sender: "assistant",
//         text:
//           "⚠️ Something went wrong. Please try again.",
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//     } finally {
//       setTyping(false);
//     }
//   }

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 30,
//             scale: 0.95,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//             scale: 1,
//           }}
//           exit={{
//             opacity: 0,
//             y: 30,
//             scale: 0.95,
//           }}
//           transition={{
//             duration: 0.25,
//           }}
//           className="
//             fixed
//             bottom-5
//             right-5
//             z-50
//             flex
//             flex-col
//             w-[calc(100vw-32px)]
//             max-w-[460px]
//             h-[85vh]
//             max-h-[850px]
//             min-h-[620px]
//             overflow-hidden
//             rounded-3xl
//             border
//             border-[#ECE7E1]
//             bg-[#F8F6F2]
//             shadow-[0_25px_80px_rgba(0,0,0,0.18)]
//           "
//         >
//           <ChatHeader onClose={onClose} />

//           <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
//             {messages.length === 0 ? (
//               <>
//                 <ChatWelcome />

//                 <div className="mt-8 space-y-4">
//                   {suggestions.map((item) => (
//                     <SuggestedPrompt
//                       key={item}
//                       text={item}
//                       onClick={() => handleSendMessage(item)}
//                     />
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <>
//                 {messages.map((message) => (
//                   <ChatMessage
//                     key={message.id}
//                     sender={message.sender}
//                     message={message.text}
//                   />
//                 ))}

//                 {typing && (
//                   <TypingIndicator message={generatingMessage} />
//                 )}

//                 <div ref={messagesEndRef} />
//               </>
//             )}
//           </div>

//           <div className="shrink-0 border-t border-[#ECE7E1] bg-white">
//             <ChatInput
//               value={input}
//               onChange={setInput}
//               onSend={() => handleSendMessage()}
//               disabled={typing}
//             />
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

////////////////Perfect code///////////

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { sendMessage } from "@/services/chat";

// import ChatHeader from "./ChatHeader";
// import ChatWelcome from "./ChatWelcome";
// import SuggestedPrompt from "./SuggestedPrompt";
// import ChatInput from "./ChatInput";
// import ChatMessage from "./ChatMessage";
// import TypingIndicator from "./TypingIndicator";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface Message {
//   id: number;
//   sender: "user" | "assistant";
//   text: string;
// }

// const GENERATING_MESSAGES = [
//   "Generating your insight",
//   "Connecting the relevant dots",
//   "Curating the details for you",
//   "Shaping a thoughtful response",
//   "Almost there — putting it all together",
// ];

// export default function ChatWindow({
//   isOpen,
//   onClose,
// }: Props) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);
//   const [generatingMessage, setGeneratingMessage] = useState(
//     GENERATING_MESSAGES[0]
//   );

//   const messagesEndRef = useRef<HTMLDivElement | null>(null);
//   const generatingMessageIndexRef = useRef(0);

//   const suggestions = [
//     "🌿 Learn about our programs",
//     "📅 Upcoming workshops",
//     "✨ Which journey suits me?",
//     "💜 Tell me about Zuva Life",
//   ];

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages, typing, generatingMessage]);

//   // Progress the typing message every 5 seconds.
//   useEffect(() => {
//     if (!typing) {
//       generatingMessageIndexRef.current = 0;
//       setGeneratingMessage(GENERATING_MESSAGES[0]);
//       return;
//     }

//     generatingMessageIndexRef.current = 0;
//     setGeneratingMessage(GENERATING_MESSAGES[0]);

//     const interval = window.setInterval(() => {
//       generatingMessageIndexRef.current = Math.min(
//         generatingMessageIndexRef.current + 1,
//         GENERATING_MESSAGES.length - 1
//       );

//       setGeneratingMessage(
//         GENERATING_MESSAGES[generatingMessageIndexRef.current]
//       );
//     }, 5000);

//     return () => {
//       window.clearInterval(interval);
//     };
//   }, [typing]);

//   async function handleSendMessage(text?: string) {
//     const content = (text ?? input).trim();

//     if (!content || typing) return;

//     const userMessage: Message = {
//       id: Date.now(),
//       sender: "user",
//       text: content,
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setGeneratingMessage(GENERATING_MESSAGES[0]);
//     setTyping(true);

//     try {
//       const response = await sendMessage(content);

//       const aiMessage: Message = {
//         id: Date.now() + 1,
//         sender: "assistant",
//         text:
//           response.message ??
//           "Sorry, I couldn't generate a response.",
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       console.error(error);

//       const aiMessage: Message = {
//         id: Date.now() + 1,
//         sender: "assistant",
//         text:
//           "⚠️ Something went wrong. Please try again.",
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//     } finally {
//       setTyping(false);
//     }
//   }

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 30,
//             scale: 0.95,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//             scale: 1,
//           }}
//           exit={{
//             opacity: 0,
//             y: 30,
//             scale: 0.95,
//           }}
//           transition={{
//             duration: 0.25,
//           }}
//           className="
//             fixed
//             bottom-5
//             right-5
//             z-50
//             flex
//             flex-col
//             w-[calc(100vw-32px)]
//             max-w-[460px]
//             h-[85vh]
//             max-h-[850px]
//             min-h-[620px]
//             overflow-hidden
//             rounded-3xl
//             border
//             border-[#ECE7E1]
//             bg-[#F8F6F2]
//             shadow-[0_25px_80px_rgba(0,0,0,0.18)]
//           "
//         >
//           <ChatHeader onClose={onClose} />

//           <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
//             {messages.length === 0 ? (
//               <>
//                 <ChatWelcome />

//                 <div className="mt-8 space-y-4">
//                   {suggestions.map((item) => (
//                     <SuggestedPrompt
//                       key={item}
//                       text={item}
//                       onClick={() => handleSendMessage(item)}
//                     />
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <>
//                 {messages.map((message) => (
//                   <ChatMessage
//                     key={message.id}
//                     sender={message.sender}
//                     message={message.text}
//                   />
//                 ))}

//                 {typing && (
//                   <TypingIndicator message={generatingMessage} />
//                 )}

//                 <div ref={messagesEndRef} />
//               </>
//             )}
//           </div>

//           <div className="shrink-0 border-t border-[#ECE7E1] bg-white">
//             <ChatInput
//               value={input}
//               onChange={setInput}
//               onSend={() => handleSendMessage()}
//               disabled={typing}
//             />
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


// "use client";

// import {
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import {
//   AnimatePresence,
//   motion,
// } from "framer-motion";

// import { sendMessage } from "../../services/chat";

// import ChatHeader from "./ChatHeader";
// import ChatWelcome from "./ChatWelcome";
// import SuggestedPrompt from "./SuggestedPrompt";
// import ChatInput from "./ChatInput";
// import ChatMessage from "./ChatMessage";
// import TypingIndicator from "./TypingIndicator";

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }

// interface Message {
//   id: number;
//   sender: "user" | "assistant";
//   text: string;
//   timestamp: number;
// }

// export default function ChatWindow({
//   open,
//   onClose,
// }: Props) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);

//   // Used to refresh relative timestamps.
//   const [, setTimeTick] = useState(0);

//   const messagesEndRef =
//     useRef<HTMLDivElement | null>(null);

//   const suggestions = [
//     "🌿 Learn about our programs",
//     "📅 Upcoming workshops",
//     "✨ Which journey suits me?",
//     "💜 Tell me about Zuva Life",
//   ];

//   // Refresh timestamps every 30 seconds.
//   useEffect(() => {
//     const interval = window.setInterval(() => {
//       setTimeTick((previous) => previous + 1);
//     }, 30000);

//     return () => {
//       window.clearInterval(interval);
//     };
//   }, []);

//   // Automatically scroll to the latest message.
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages, typing]);

//   async function handleSendMessage(text?: string) {
//     const content = (text ?? input).trim();

//     if (!content || typing) return;

//     const userMessage: Message = {
//       id: Date.now(),
//       sender: "user",
//       text: content,
//       timestamp: Date.now(),
//     };

//     // Preserve the existing conversation before adding
//     // the current message to the conversation state.
//     const conversationHistory = messages
//       .slice(-8)
//       .map((message) => ({
//         role: message.sender,
//         content: message.text,
//       }));

//     setMessages((previous) => [
//       ...previous,
//       userMessage,
//     ]);

//     setInput("");
//     setTyping(true);

//     try {
//       // Send previous conversation messages to the backend.
//       const response = await sendMessage(
//         content,
//         conversationHistory
//       );

//       const aiMessage: Message = {
//         id: Date.now() + 1,
//         sender: "assistant",
//         text:
//           response.message ??
//           "Sorry, I couldn't generate a response.",
//         timestamp: Date.now(),
//       };

//       setMessages((previous) => [
//         ...previous,
//         aiMessage,
//       ]);
//     } catch (error) {
//       console.error(
//         "[Milo Widget] Message request failed:",
//         error
//       );

//       const aiMessage: Message = {
//         id: Date.now() + 1,
//         sender: "assistant",
//         text:
//           "⚠️ Something went wrong. Please try again.",
//         timestamp: Date.now(),
//       };

//       setMessages((previous) => [
//         ...previous,
//         aiMessage,
//       ]);
//     } finally {
//       setTyping(false);
//     }
//   }

//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 30,
//             scale: 0.95,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//             scale: 1,
//           }}
//           exit={{
//             opacity: 0,
//             y: 30,
//             scale: 0.95,
//           }}
//           transition={{
//             duration: 0.25,
//           }}
//           className="
//             zuva-chat-window
//             fixed
//             bottom-5
//             right-5
//             z-50
//             flex
//             flex-col
//             w-[calc(100vw-32px)]
//             max-w-[460px]
//             h-[85vh]
//             max-h-[850px]
//             min-h-0
//             overflow-hidden
//             rounded-3xl
//             border
//             border-[#ECE7E1]
//             bg-[#F8F6F2]
//             shadow-[0_25px_80px_rgba(0,0,0,0.18)]

//             max-sm:
//             bottom-2
//             right-2
//             left-2
//             w-auto
//             h-[calc(100dvh-16px)]
//             max-h-none
//             min-h-0
//             rounded-2xl
//           "
//         >
//           <ChatHeader onClose={onClose} />

//           <div className="zuva-chat-messages">
//             {messages.length === 0 ? (
//               <>
//                 <ChatWelcome />

//                 <div className="zuva-suggested-prompts">
//                   {suggestions.map((item) => (
//                     <SuggestedPrompt
//                       key={item}
//                       text={item}
//                       onClick={() =>
//                         handleSendMessage(item)
//                       }
//                     />
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <>
//                 {messages.map((message) => (
//                   <ChatMessage
//                     key={message.id}
//                     sender={message.sender}
//                     message={message.text}
//                     timestamp={message.timestamp}
//                   />
//                 ))}

//                 {typing && <TypingIndicator />}

//                 <div ref={messagesEndRef} />
//               </>
//             )}
//           </div>

//           <div className="zuva-chat-footer">
//             <ChatInput
//               value={input}
//               onChange={setInput}
//               onSend={() =>
//                 handleSendMessage()
//               }
//               disabled={typing}
//             />
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }




"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { sendMessage } from "../../services/chat";

import ChatHeader from "./ChatHeader";
import ChatWelcome from "./ChatWelcome";
import SuggestedPrompt from "./SuggestedPrompt";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  sender: "user" | "assistant";
  text: string;
  timestamp: number;
}

export default function ChatWindow({
  open,
  onClose,
}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  // Persistent conversation reference.
  const messagesRef = useRef<Message[]>([]);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  const suggestions = [
    "🌿 Learn about our programs",
    "📅 Upcoming workshops",
    "✨ Which journey suits me?",
    "💜 Tell me about Zuva Life",
  ];

  // Update React state and the persistent reference together.
  function appendMessage(message: Message) {
    const updatedMessages = [
      ...messagesRef.current,
      message,
    ];

    messagesRef.current = updatedMessages;
    setMessages(updatedMessages);
  }

  // Automatically scroll to the latest message.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  async function handleSendMessage(text?: string) {
    const content = (text ?? input).trim();

    if (!content || typing) return;

    // Read conversation history before adding the current message.
    const conversationHistory = messagesRef.current
      .slice(-8)
      .map((message) => ({
        role: message.sender,
        content: message.text,
      }));

    console.log(
      "[Milo Widget] Previous conversation messages:",
      conversationHistory.length
    );

    console.log(
      "[Milo Widget] Conversation history:",
      conversationHistory
    );

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: content,
      timestamp: Date.now(),
    };

    // Add the user's message to persistent conversation state.
    appendMessage(userMessage);

    setInput("");
    setTyping(true);

    try {
      console.log(
        "[Milo Widget] Sending message:",
        content
      );

      const response = await sendMessage(
        content,
        conversationHistory
      );

      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "assistant",
        text:
          response.message ??
          "Sorry, I couldn't generate a response.",
        timestamp: Date.now(),
      };

      // Store Milo's response for the next conversation turn.
      appendMessage(aiMessage);

      console.log(
        "[Milo Widget] Assistant response stored in conversation history."
      );
    } catch (error) {
      console.error(
        "[Milo Widget] Message request failed:",
        error
      );

      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: "assistant",
        text:
          "⚠️ Something went wrong. Please try again.",
        timestamp: Date.now(),
      };

      appendMessage(errorMessage);
    } finally {
      setTyping(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 30,
            scale: 0.95,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            zuva-chat-window
            fixed
            bottom-5
            right-5
            z-50
            flex
            flex-col
            w-[calc(100vw-32px)]
            max-w-[460px]
            h-[85vh]
            max-h-[850px]
            min-h-0
            overflow-hidden
            rounded-3xl
            border
            border-[#ECE7E1]
            bg-[#F8F6F2]
            shadow-[0_25px_80px_rgba(0,0,0,0.18)]

            max-sm:
            bottom-2
            right-2
            left-2
            w-auto
            h-[calc(100dvh-16px)]
            max-h-none
            min-h-0
            rounded-2xl
          "
        >
          <ChatHeader onClose={onClose} />

          <div className="zuva-chat-messages">
            {messages.length === 0 ? (
              <>
                <ChatWelcome />

                <div className="zuva-suggested-prompts">
                  {suggestions.map((item) => (
                    <SuggestedPrompt
                      key={item}
                      text={item}
                      onClick={() =>
                        handleSendMessage(item)
                      }
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    sender={message.sender}
                    message={message.text}
                  />
                ))}

                {typing && (
                  <TypingIndicator message="Milo is thinking..." />
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          <div className="zuva-chat-footer">
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={() => handleSendMessage()}
              disabled={typing}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


