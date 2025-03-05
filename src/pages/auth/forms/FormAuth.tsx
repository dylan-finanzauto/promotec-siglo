import { useForm } from "@tanstack/react-form";
import promotec from "../../../assets/svg/promotec.svg";
import { InputField } from "../../../components/common/InputField";
import SpinnerIcon from "../../../components/common/icons/SpinnerIcon";
import { LoginRequest } from "../../../types/Rest";

type Props = {
    onLogin: (user: LoginRequest) => Promise<void>;
}

const FormAuth: React.FC<Props> = ({ onLogin }) => {

    const form = useForm({
        defaultValues: {
            username: '',
            password: ''
        },
        onSubmit: async ({ value }) => {
            await onLogin(value)
        }
    })

    return (
        <>
            <div className="text-center space-y-5 mb-10">
                <h1 className="text-secn-blue text-5xl font-bold">
                    Ingreso SIGLO
                </h1>
                <p className="text-text2 text-xl">
                    Bienvenido, digita tus credenciales para acceder a
                    la plataforma.
                </p>
            </div>
            <form action="" className="space-y-6" onSubmit={async (e) => {
                e.preventDefault()
                e.stopPropagation()
                await form.handleSubmit()
            }}>
                <div className="flex flex-col gap-1">
                    <form.Field
                        name="username"
                        validators={{
                            onChange: ({ value }) => !value ? 'Usuario requerido' : undefined
                        }}
                        children={(field) => (
                            <>
                                <label htmlFor={field.name} className={field.state.meta.errors.length > 0 ? "text-red-500" : ""}>Usuario</label>
                                <InputField
                                    type="text"
                                    id={field.name}
                                    name={field.name}
                                    error={field.state.meta.errors.length > 0}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {/* <FieldInfo field={field} /> */}
                            </>
                        )} />
                </div>

                <div className="flex flex-col gap-1">
                    <form.Field
                        name="password"
                        validators={{
                            onChange: ({ value }) => !value ? "Contraseña requerida" : undefined
                        }}
                        children={(field) => (
                            <>
                                <label htmlFor="password" className={field.state.meta.errors.length > 0 ? "text-red-500" : ""}>Contraseña</label>
                                <InputField
                                    type="password"
                                    id={field.name}
                                    name={field.name}
                                    error={field.state.meta.errors.length > 0}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {/* <FieldInfo field={field} /> */}
                            </>
                        )}
                    />
                </div>

                <div className="pt-14 mx-3">
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <button
                                className="h-10 flex items-center justify-center w-full text-center bg-tirth disabled:bg-tirth/40 text-white rounded-lg cursor-pointer disabled:cursor-auto" disabled={!canSubmit || isSubmitting}>
                                {isSubmitting ? (
                                    <SpinnerIcon />
                                ) : (
                                    'Iniciar Sesión'
                                )}

                            </button>
                        )}
                    />
                </div>
            </form>

            <div className="flex justify-center mt-16">
                <img className="" src={promotec} alt="" />
            </div>

        </>
    )
}

export default FormAuth;
