import styles from "../styles/DressCode.module.scss";
import { NextPage } from "next";
import { Header } from "../components/Header";
import { BackButton } from "../components/BackButton";

const DressCode: NextPage = () => {
	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.padding10}>
				<BackButton text="Voltar" />
				<h2>Dress Code Convidados</h2>
				<p>
					Dress Code: <b>passeio/esporte fino</b>
				</p>
				<p>
					Queremos todos confortáveis, no entanto gostaríamos de fazer algumas
					recomendações referentes ao vestuário para o bom andamento da
					cerimônia, que será ao ar livre.
				</p>
				<p>
					Será em um espaço gramado, portanto, recomendamos o uso de saltos mais
					grossos. Combinar suas roupas com tênis também está liberado!
				</p>
				<p>Aconselhamos levar um chinelo para a festa ❤️</p>
				<p>
					<b>Evitar as cores</b>: preto, branco e off white, mesmo em estampas
					florais.
				</p>
				<p>
					<a
						href="https://modaparahomens.com.br/traje-passeio-ou-esporte-fino-o-que-usar/amp/"
						target="_blank"
						rel="noreferrer"
					>
						O que é passeio/esporte fino para homens?
					</a>
				</p>
				<p>
					<a
						href="https://blog.insiderstore.com.br/como-usar-traje-esporte-fino-feminino-em-diferentes-eventos/"
						target="_blank"
						rel="noreferrer"
					>
						O que é passeio/esporte fino para mulheres?
					</a>
				</p>
			</div>
		</div>
	);
};

export default DressCode;
